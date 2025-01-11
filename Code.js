function doGet(e) {
  const output = HtmlService.createTemplateFromFile("index").evaluate()
  output.addMetaTag('viewport', 'width=device-width, inicital-scale=1')
  return output
}

function include(file){
  return HtmlService.createHtmlOutputFromFile(file).getContent()
}