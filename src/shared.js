import store from './store'

export default{

  getArabDate: (last_updated) => {
    var date = new Date(last_updated)
    var months = ['يناير','فبراير','مارس', 'إبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']
    var days = ['اﻷحد','اﻷثنين','الثلاثاء','اﻷربعاء','الخميس','الجمعة','السبت']
    var delDateString =days[date.getDay()] +', ' +date.getDate() +' ' +months[date.getMonth()] +', ' + date.getFullYear()
    return delDateString
    },
    // Async makes a JavaScript function return a promise
    fetchData: async (info) => {
      try {
        // Await makes a JavaScript function wait for a promise
        const promise = await fetch(`${store.state.tokenModel.url + info.url}?page=${info.pageNum}&page_size=${info.pageSize}`)
        const data = await promise.json()
        return data
      } catch (err) {
        console.log(err)
      }
    }
}
