export const checkStrait = dice =>{
  if(dice.length<6){
    return false
  }
  for(let i = 0; i < dice.length; i++){
    if(!((i+1) === dice.sort()[i])){
       return false
    }
  }
  return true
}

export const scoreStrait = dice =>{
  if(checkStrait(dice)){
    return 1000
  }
  return 0
}
