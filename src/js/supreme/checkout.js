const fillCheckout = () => {
	chrome.runtime.sendMessage({msg: "privateData"}, function(data) {
		var r = JSON.parse(data)
		
		chrome.runtime.sendMessage({msg: "params"}, function(settings) {

			//this check if choosen country is in country list
			if ($('#order_billing_country').find('option[value=' + r.country + ']').length > 0) {
				//this remove captcha but not stable, payment failed sometimes
				if (settings.removeCaptcha)
					$(".g-recaptcha").remove()

				//shipping
				$('#order_billing_name').val(r.name)
				$('#order_email').val(r.email)
				$('#order_tel').val(r.phone)
				$('#bo').val(r.address1)
				$('#oba3').val(r.address2)
				if (r.country != "USA" && r.country != "CANADA")
					$('#order_billing_address_3').val(r.address3)
				$('#order_billing_zip').val(r.zip)
				$('#order_billing_city').val(r.city)
				if (r.country == "USA")
					$('#order_billing_state').val(r.state)
				else if (r.country == "CANADA")
					$('#order_billing_state').val(r.province)
				$('#order_billing_country').val(r.country)
				
				//billing
				$('#credit_card_type').val(r.card_type)
				$('#cnb').val(r.card_number)
				$('#vval').val(r.cvv)
				$('#credit_card_month').val(r.card_month)
				$('#credit_card_year').val(r.card_year)
				$(".icheckbox_minimal").click()
				$('[name=commit]').click()
			}
		})
	})
}