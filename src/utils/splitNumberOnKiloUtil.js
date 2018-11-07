
export const splitNumberOnKiloUtil = (number) => {
  let splitNumber = ''
  const splitNumberList = number.toString().match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  splitNumberList.map((item)=>{
    splitNumber += item + ' ';
  })
  return splitNumber
}