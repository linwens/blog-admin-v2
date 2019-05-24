import Mock from 'mockjs'
// const Random = Mock.Random
// Random.image()
const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    brief: '@sentence(30, 50)',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})
const gallery = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@ctitle(3, 5)',
    brief: '@csentence(20,30)',
    display_time: '@datetime',
    thumbnail: '@image',
    url: '@image',
    theme: '@ctitle(5, 6)'
  }]
})

export default [
  {
    url: '/table/gallery/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20, title, brief, sort } = config.query
      let mockList = gallery.items.filter(item => {
        if (title && item.title.indexOf(title) < 0) return false
        if (brief && item.brief.indexOf(brief) < 0) return false
        return true
      })
      // 根据发布时间排序
      function sortFunc(a, b) {
        let date1, date2
        date1 = a.display_time.substring(0, 19)
        date1 = date1.replace(/-/g, '/')
        date2 = b.display_time.substring(0, 19)
        date2 = date2.replace(/-/g, '/')
        const timestamp1 = new Date(date1).getTime()
        const timestamp2 = new Date(date2).getTime()
        return {
          a: timestamp1,
          b: timestamp2
        }
      }
      if (sort < 0) {
        mockList = mockList.sort((a, b) => {
          const rslt = sortFunc(a, b)
          return parseInt(rslt.a) - parseInt(rslt.b)
        })
      } else {
        mockList = mockList.sort((a, b) => {
          const rslt = sortFunc(a, b)
          return parseInt(rslt.b) - parseInt(rslt.a)
        })
      }
      const items = mockList.filter((item, index) => {
        return index < limit * page && index >= limit * (page - 1)
      })
      // const items = data.items
      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: items
        }
      }
    }
  },
  {
    url: '/table/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20, title, brief, status, sort } = config.query
      let mockList = data.items.filter(item => {
        if (title && item.title.indexOf(title) < 0) return false
        if (brief && item.brief.indexOf(brief) < 0) return false
        if (status && status.length > 0 && !status.includes(item.status)) return false
        return true
      })
      // 根据发布时间排序
      function sortFunc(a, b) {
        let date1, date2
        date1 = a.display_time.substring(0, 19)
        date1 = date1.replace(/-/g, '/')
        date2 = b.display_time.substring(0, 19)
        date2 = date2.replace(/-/g, '/')
        const timestamp1 = new Date(date1).getTime()
        const timestamp2 = new Date(date2).getTime()
        return {
          a: timestamp1,
          b: timestamp2
        }
      }
      if (sort < 0) {
        mockList = mockList.sort((a, b) => {
          const rslt = sortFunc(a, b)
          return parseInt(rslt.a) - parseInt(rslt.b)
        })
      } else {
        mockList = mockList.sort((a, b) => {
          const rslt = sortFunc(a, b)
          return parseInt(rslt.b) - parseInt(rslt.a)
        })
      }
      const items = mockList.filter((item, index) => {
        return index < limit * page && index >= limit * (page - 1)
      })
      // const items = data.items
      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: items
        }
      }
    }
  }
]
