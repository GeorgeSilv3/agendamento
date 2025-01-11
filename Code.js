function doGet(e) {
  const output = HtmlService.createTemplateFromFile("index").evaluate()
  output.addMetaTag('viewport', 'width=device-width, inicital-scale=1')
  return output
}

function include(file){
  return HtmlService.createHtmlOutputFromFile(file).getContent()
}

function save(client){
  console.log("entrou")
  const ss = SpreadsheetApp.getActive()
  const tab = ss.getSheetByName("agendamentos")
  const lastRow = tab.getLastRow()
  const lastColumn = tab.getLastColumn()
  const header = tab.getRange(1, 1, 1, lastColumn).getValues()[0]
  console.log(header, lastColumn, lastRow)
  for (data in client){
    console.log(data)
    const index = headerSearcher(header, header.length, data)
    tab.getRange(lastRow+1, index).setValue(client[data])
  }
}

function headerSearcher(header, len, data){
  for (let index = 0; index < len; index++){
    if (header[index] == data){
      console.log(index)
      return index+1
    }
  }
}