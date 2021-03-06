  //Method to read excel file and convert it into JSON 
  function excelFileToJSON(){
    fetch("catalogue.xlsx")
    .then(res => res.blob())
    .then(blob => {
     const file = new File([blob], 'catalogue.xlsx', blob)
     return file;
    }).then(file=>{
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function(e) {

            var data = e.target.result;
            var workbook = XLSX.read(data, {
                type : 'binary'
            });
            var result = {};
            var firstSheetName = workbook.SheetNames[0];
            //reading only first sheet data
            var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
            //displaying the json result into HTML table
            displayJsonToHtmlTable(jsonData);
            }})
  }
function displayJsonToHtmlTable(jsonData){
    var table=document.getElementById("dataTable");
    if(jsonData.length>0){
        var htmlData='<thead><tr> <th>ISBN</th><th>	Titre</th><th>	Auteur</th><th>	Discipline</th><th>	Année</th><th>PUHT</th></tr></thead><tbody>';
        for(var i=0;i<jsonData.length;i++){
            var row=jsonData[i];
            htmlData+='<tr><td>'+row["ISBN"]+'</td><td>'+row["Titre"]+'</td><td>'+row["Auteur"]+'</td><td>'+row["Discipline"]+'</td><td>'+row["Année"]+'</td><td>'+row["PUHT"]+'</td></tr>';  }
        htmlData+='</tbody>'
        htmlData+='<tfooter><tr> <th>ISBN</th><th>	Titre</th><th>	Auteur</th><th>	Discipline</th><th>	Année</th><th>PUHT</th></tr><tbody>';
        x=document.getElementById('Patienter')
        x.style.display = "none";
        table.innerHTML=htmlData;
        $(document).ready(function() {
            $('#dataTable').DataTable();
          });
    }else{
        table.innerHTML='There is no data in XLSX';
    }
}
 excelFileToJSON()
