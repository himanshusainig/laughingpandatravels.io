 
$(document).ready(function(){	
	// add item to cart
$("#shopping-cart-results").load("cart.php");
	$(".product-form").submit(function(e){
		var form_data = $(this).serialize();
		var button_content = $(this).find('button[type=submit]');
		button_content.html('..'); 
		$.ajax({
			url: "../manage_cart.php",
			type: "POST",
			dataType:"json",
			data: form_data
		}).done(function(data){		    
			$("#cart-container").html(data.products);
            $("#shopping-cart-results").load("cart.php");
			button_content.html('<i class="<fas fa-heart f-20 text-success"></i>'); 			
		})
		e.preventDefault();
	});	
	//Remove items from cart
	$("#shopping-cart-results").on('click', '.remove-item', function(e) {
		e.preventDefault(); 
		var pcode = $(this).attr("data-code"); 
		$(this).parent().parent().fadeOut();
		$.getJSON( "manage_cart.php", {"remove_code":pcode} , function(data){
			$("#cart-container").html(data.products); 	
			$("#shopping-cart-results").load("cart.php"); 			
		});
	});
});
 