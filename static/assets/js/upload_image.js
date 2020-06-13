$(document).ready(function(){
		
		console.log("On Load call get card api " + localStorage.visiting_card_id );
		var visiting_card_id = localStorage.visiting_card_id;
		
		var $loading = $('#loader').hide();
	$(document)
		.ajaxStart(function () {
			$loading.show();
			console.log("ajax start");
		})
		.ajaxStop(function () {
			$loading.hide();
			console.log("ajax stop");
		});
		
		$('INPUT[type="file"]').change(function () {
    var ext = this.value.match(/\.(.+)$/)[1];
    switch (ext) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            $('#but_upload').attr('disabled', false);
            break;
        default:
            alert('This is not an allowed file type.');
            this.value = '';
    }
});

		 function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $('#img').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#file").change(function(){
        readURL(this);
    });
	

            $("#but_upload").click(function(){

                var fd = new FormData();

                var file = $('#file')[0].files[0];
				console.log("File : "+file);
				if(file){
					console.log("File exist : "+file);
                fd.append('file',file);

                $.ajax({
                    url:'https://einvite.tech/upload_image/'+visiting_card_id,
                    type:'post',
                    data:fd,
                    contentType: false,
                    processData: false,
                    success:function(response){
					console.log("Response");
					console.log(response);
                        if(response && response.status == 'success'){
						console.log("File uploaded successfully"+file);
						alert("image uploaded successfully");
						window.location="editCard.html";
                        }else{
                            alert('File not uploaded');
                        }
                    },
		error: function (xhr, status, error) {
		alert("Some error happened ");
			console.log(xhr);
			var err = JSON.parse(xhr.responseText);
			console.log("xhr.responseText : " + xhr.responseText);
			console.log("error message : " + err.error);
			console.log(xhr.status);
			console.log("status : " + status);
			console.log("error : " + error);
			alert("Some error occured");
			window.location = "index.html";
		}
			});}else{
				console.log("File doesnt exist : "+file);
				alert("Please select the image to upload ");
			}
				
            });
        });

