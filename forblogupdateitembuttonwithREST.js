//need column iwth workflow to copy id
//put the following in calculated column:
//="<div><a href='#' onclick='javascript:UpdateItem("&CalculatedID&");'><img alt='delete' src='/_layouts/images/delitem.gif' style='border:0px;' /></a></div> "


$(document).ready(function(){
$(".ms-vb2:contains('<div')").each(function(){
var tempDIV = document.createElement ("div");
tempDIV.style.cursor = "pointer";
tempDIV.innerHTML = $(this).text();
$(this).text("");
$(this).append(tempDIV);

});
});

function UpdateItem(cID)
{try{
var cnf = confirm("Are you sure you want to remove your question or comment?");
//this is default message that sharepoint gives.
if(cnf)
{
console.log(cID);
//begin rest
 $.ajax({
   url: _spPageContextInfo.webServerRelativeUrl + "/_api/web/lists/getbytitle('WorkflowTasks')/items(" + cID +")",
   type: "POST",
                contentType: "application/json;odata=verbose",
                data: JSON.stringify(
                {
                    '__metadata': {
                        'type': 'SP.Data.WorkflowTasksItem'
                    },
                    
                    'DeleteValue': "Delete"
                    
                }),
                headers: {
                    "accept": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    "IF-MATCH": "*",
                    "X-Http-Method": "PATCH"
                },
                success: function (data) {
                 window.location.reload();

                    

                },
                error: function (err) {
                    alert(JSON.stringify(err));
                }

  });


//end rest


 
}


}catch(ex){alert(ex);} 
