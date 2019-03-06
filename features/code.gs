function createDoc(e) {
  const file = Drive.Files.copy({title: e.parameter.name, properties: [{key: 'trelloCardId', value: e.parameter.id}]}, '1M81uHVUfkZpPQZsYfJH-RDnveLgEKpF-upfX39a3xK4')
  const doc = DocumentApp.openById(file.id)
  doc.addHeader().setText('Referenced Trello card: ' + e.parameter.url)
  return ContentService.createTextOutput(file).setMimeType(ContentService.MimeType.JSON);
}

function checkForDoc(e) {
  const q = "properties has { key='trelloCardId' and value='" +  e.parameter.id +"' and visibility='PRIVATE' }"
  const search = Drive.Files.list({q: q})
  if (search.items[0]) {
    return ContentService.createTextOutput(search.items[0]).setMimeType(ContentService.MimeType.JSON);
  } else {
    return  ContentService.createTextOutput({}).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  if (e.parameter.action === 'checkForDoc') return checkForDoc(e) 
  if (e.parameter.action === 'createDoc') return createDoc(e) 
}
