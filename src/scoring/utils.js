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
  array.map((itm, idx)=>(
    (idx+1, arrayHasHowMany(array, idx+1))
  ))
)

module.exports = {
  getArrayCounts,
  arrayHasHowMany,
}