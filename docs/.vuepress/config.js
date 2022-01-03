module.exports = {
  theme: '',
  title: 'Pytorch Distributed Training Tutorial',
  description: '使用Pytorch分布式训练的示例代码',
  base: '/',
  port: '8080',
  themeConfig: {
    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '组件',
        link: '/comps/'
      },
      {
        text: 'pytorch',
        link: '/pytorch/'
      }
    ],
    sidebar: {
      '/comps/': [
        {
          title: '组件列表一',
          collapsable: false,
          children: [
            '/comps/',
            '/comps/select.md',
            '/comps/button.md',
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
          ]
        },
      ]
    },
  },
  head: [],
  plugins: ['demo-container'],
  markdown: {}
}