(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{587:function(t,a,s){"use strict";s.r(a);var n=s(38),r=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"自定义数据集"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#自定义数据集"}},[t._v("#")]),t._v(" 自定义数据集")]),t._v(" "),s("h2",{attrs:{id:"上传数据集"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#上传数据集"}},[t._v("#")]),t._v(" 上传数据集")]),t._v(" "),s("blockquote",[s("p",[t._v("通过 "),s("a",{attrs:{href:"http://10.249.181.72:8079/file",target:"_blank",rel:"noopener noreferrer"}},[t._v("ICES网盘"),s("OutboundLink")],1),t._v(" 上传你的数据集，假设路径为"),s("code",[t._v("/datasets/your_dataset")]),t._v("，\n则在代码中使用"),s("code",[t._v("/home/datasets/your_dataset")]),t._v("作为数据集路径，其它代码不变")])]),t._v(" "),s("h2",{attrs:{id:"以cifar10数据集为例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#以cifar10数据集为例"}},[t._v("#")]),t._v(" 以Cifar10数据集为例")]),t._v(" "),s("blockquote",[s("ul",[s("li",[t._v("上传Cifar10数据集"),s("strong",[t._v("cifar-10-batches-py")]),t._v("到网盘系统\n"),s("ul",[s("li",[t._v("假设路径为 "),s("code",[t._v("/datasets/cifar-10-batches-py")])])])]),t._v(" "),s("li",[t._v("在代码中创建数据集")])]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" torchvision"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("datasets "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" CIFAR10\n\ntrainset "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" torchvision"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("datasets"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("CIFAR10"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n      root"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/home/datasets"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      train"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("True")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      download"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("False")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      transform"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("transforms"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Compose"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n              transforms"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("RandomCrop"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("32")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" padding"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n              transforms"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("RandomHorizontalFlip"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n              transforms"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ToTensor"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n              transforms"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Normalize"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n                  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.4914")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.4822")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.4465")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.2023")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.1994")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.2010")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])])])}),[],!1,null,null,null);a.default=r.exports}}]);