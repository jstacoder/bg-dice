const arrayHasHowMany = (array, num) =>{
    let result = 0
    array.forEach(itm => {
      if(itm==num){
        result++
      }
    })
    return result
} 


const getArrayCounts = array =>(
  [1,2,3,4,5,6].map((itm, idx)=>(
    (itm, arrayHasHowMany(array, itm))
  ))
)

module.exports = {
  getArrayCounts,
  arrayHasHowMany,
}