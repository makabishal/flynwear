export default (plop) => {
  const basePath = 'src/features/{{kebabCase name}}';

  plop.setGenerator('feature', {
    description:
        'Generate a feature module with API, hooks, constants, types, etc.',

    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Feature name (e.g. booking, checkout):',
      },
    ],

    actions: [
      // COMPONENT
      {
        type: 'add',
        path: `${basePath}/components/{{kebabCase name}}-view.tsx`,
        templateFile: 'plop-templates/feature/components/component.hbs',
      },
      {
        type: 'add',
        path: `${basePath}/components/index.ts`,
        templateFile: 'plop-templates/feature/components/index.hbs',
      },

      // API
      {
        type: 'add',
        path: `${basePath}/api/{{kebabCase name}}.api.ts`,
        templateFile: 'plop-templates/feature/api/api.hbs',
      },
      {
        type: 'add',
        path: `${basePath}/api/index.ts`,
        templateFile: 'plop-templates/feature/api/index.hbs',
      },

      // Hooks
      {
        type: 'add',
        path: `${basePath}/hooks/use-{{kebabCase name}}.ts`,
        templateFile: 'plop-templates/feature/hooks/use-hook.hbs',
      },
      {
        type: 'add',
        path: `${basePath}/hooks/index.ts`,
        templateFile: 'plop-templates/feature/hooks/index.hbs',
      },

      // Constants
      {
        type: 'add',
        path: `${basePath}/constants/api.constant.ts`,
        templateFile: 'plop-templates/feature/constants/api.constant.hbs',
      },
      {
        type: 'add',
        path: `${basePath}/constants/query.constant.ts`,
        templateFile: 'plop-templates/feature/constants/query.constant.hbs',
      },
      {
        type: 'add',
        path: `${basePath}/constants/index.ts`,
        templateFile: 'plop-templates/feature/constants/index.hbs',
      },

      // Enums
      {
        type: 'add',
        path: `${basePath}/enums/{{kebabCase name}}.enum.ts`,
        templateFile: 'plop-templates/feature/enums/enum.hbs',
      },
      {
        type: 'add',
        path: `${basePath}/enums/index.ts`,
        templateFile: 'plop-templates/feature/enums/index.hbs',
      },

      // Types
      {
        type: 'add',
        path: `${basePath}/types/{{kebabCase name}}.types.ts`,
        templateFile: 'plop-templates/feature/types/types.hbs',
      },
      {
        type: 'add',
        path: `${basePath}/types/index.ts`,
        templateFile: 'plop-templates/feature/types/index.hbs',
      },

      // Root export
      {
        type: 'add',
        path: `${basePath}/index.ts`,
        templateFile: 'plop-templates/feature/index.hbs',
      },

      // Store (zustand)
      {
        type: 'add',
        path: `${basePath}/store/use-{{kebabCase name}}-store.ts`,
        templateFile: 'plop-templates/feature/store/use-store.hbs',
      },
      {
        type: 'add',
        path: `${basePath}/store/index.ts`,
        templateFile: 'plop-templates/feature/store/index.hbs',
      },

      // Utils
      {
        type: 'add',
        path: `${basePath}/utils/{{kebabCase name}}-util.ts`,
        templateFile: 'plop-templates/feature/utils/util.hbs',
      },
      {
        type: 'add',
        path: `${basePath}/utils/index.ts`,
        templateFile: 'plop-templates/feature/utils/index.hbs',
      },
    ],
  });
};