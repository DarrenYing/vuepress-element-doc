module.exports = {
  theme: '',
  title: 'ICES Distributed Training System Tutorial',
  description: 'ICES分布式训练系统帮助文档',
  base: '/docs/',
  port: '8081',
  themeConfig: {
    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: 'ICES网盘',
        link: '/storage/'
      },
      {
        text: 'pytorch',
        link: '/pytorch/'
      },
      {
        text: 'Github',
        link: 'https://github.com/DarrenYing/vuepress-element-doc'
      }
    ],
    sidebar: {
      '/storage/': [
        {
          title: 'ICES网盘操作',
          collapsable: false,
          children: [
            '/storage/',
            '/storage/SeaweedFS-Dataset.md',
            '/storage/Submit-Project-Task.md',
          ]
        },
      ],
      '/pytorch/': [
        {
          title: '分布式训练',
          collapsable: false,
          children: [
            '/pytorch/',
            '/pytorch/Use-DistributedDataParallel.md',
            '/pytorch/Issue-Record.md',
            '/pytorch/MultiNode-Distributed.md',
          ]
        },
      ]
    },
  },
  head: [],
  plugins: ['demo-container'],
  markdown: {},
  dest: 'docs/.vuepress/ices_doc',
}