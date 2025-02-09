import {
  Tree,
  ensurePackage,
  readNxJson,
  readProjectConfiguration,
  updateJson,
  updateProjectConfiguration,
} from '@nx/devkit';
import { NormalizedSchema } from '../schema';
import { addVitestTargetDefaults } from '../../init/lib/utils';
import { nxVersion } from '../../../utils/versions';

export async function addVitest(tree: Tree, options: NormalizedSchema) {
  addVitestTargetDefaults(tree);
  const nxJson = readNxJson(tree);
  const hasPlugin = nxJson.plugins?.some((p) =>
    typeof p === 'string'
      ? p === '@nx/nuxt/plugin'
      : p.plugin === '@nx/nuxt/plugin'
  );

  const { createOrEditViteConfig, vitestGenerator } = ensurePackage<
    typeof import('@nx/vite')
  >('@nx/vite', nxVersion);

  const vitestTask = await vitestGenerator(
    tree,
    {
      project: options.name,
      uiFramework: 'none',
      coverageProvider: 'v8',
      skipFormat: true,
      testEnvironment: 'jsdom',
      skipViteConfig: true,
    },
    hasPlugin
  );

  createOrEditViteConfig(
    tree,
    {
      project: options.name,
      includeLib: false,
      includeVitest: true,
      testEnvironment: 'jsdom',
      imports: [`import vue from '@vitejs/plugin-vue'`],
      plugins: ['vue()'],
    },
    true,
    undefined,
    true
  );

  updateJson(tree, `${options.appProjectRoot}/tsconfig.spec.json`, (json) => {
    json.compilerOptions ??= {};
    json.compilerOptions.composite = true;
    return json;
  });

  return vitestTask;
}
