let menu = [{
		id: 1,
		nama: 'Nasi Goreng Padang',
		kategori: 'food',
		harga: 18000,
		foto: 'nasigoreng.jpg'
	},
	{
		id: 2,
		nama: 'Sate Madura',
		kategori: 'food',
		harga: 26000,
		foto: 'sate.jpg'
	},
	{
		id: 3,
		nama: 'Bakso Goreng',
		kategori: 'food',
		harga: 25000,
		foto: 'baksogoreng.jpg'
	},
	{
		id: 4,
		nama: 'Jus Nanas',
		kategori: 'drink',
		harga: 7000,
		foto: 'jusnanas.jpg'
	},
	{
		id: 5,
		nama: 'Jus Jeruk',
		kategori: 'drink',
		harga: 5000,
		foto: 'esjeruk.jpg'
	},
	{
		id: 6,
		nama: 'Air Mineral',
		kategori: 'drink',
		harga: 4000,
		foto: 'airmineral.jpg'
	},
	{
		id: 7,
		nama: 'Teh Manis',
		kategori: 'drink',
		harga: 3000,
		foto: 'hangattea.jpg'
	},
	{
		id: 8,
		nama: 'Teh Lemon',
		kategori: 'drink',
		harga: 9090,
		foto: 'lemontea.jpg'
	}
]

let user = {}

function setPage(menu) {
	if (menu == "home") {
		loadCart()
		$('#home').show()
		$('#menu').hide()
		$('#order').hide()
		$('#account').hide()
		$('#cart').hide()
		$('#order-detail').hide()

		$('#nav').show()
		$('#order-btn').hide()
	} else if (menu == "menu") {
		loadMenu()
		loadCart()
		$('#home').hide()
		$('#menu').show()
		$('#order').hide()
		$('#account').hide()
		$('#cart').hide()
		$('#order-detail').hide()

		$('#nav').show()
		$('#order-btn').hide()
	} else if (menu == "order") {
		loadOrder()
		$('#home').hide()
		$('#menu').hide()
		$('#order').show()
		$('#account').hide()
		$('#cart').hide()
		$('#order-detail').hide()

		$('#nav').show()
		$('#order-btn').hide()
	} else if (menu == "account") {
		loadProfile()
		$('#home').hide()
		$('#menu').hide()
		$('#order').hide()
		$('#account').show()
		$('#cart').hide()
		$('#order-detail').hide()

		$('#nav').show()
		$('#order-btn').hide()
	} else if (menu == "cart") {
		loadCart()
		$('#home').hide()
		$('#menu').hide()
		$('#order').hide()
		$('#account').hide()
		$('#cart').show()
		$('#order-detail').hide()

		$('#nav').hide()
		$('#order-btn').show()
	} else if (menu == "order-detail") {
		loadCart()
		$('#home').hide()
		$('#menu').hide()
		$('#order').hide()
		$('#account').hide()
		$('#cart').hide()
		$('#order-detail').show()

		$('#nav').hide()
		$('#order-btn').hide()
	}
}

function loadData() {
	setPage('home')
	initialLoad()
}

function initialLoad() {
	if (!localStorage.menu) {
		localStorage.setItem('menu', JSON.stringify(menu))
	}
	loadProfile()
	setTimeout(function () {
		$(".preloader").hide()
	}, 1000)
}
// slider
$(document).ready(function () {
	$('.slider').slick({
		dots: true,
		autoplay: true,
		autoplaySpeed: 2500,
		slidesToShow: 1,
		slidesToScroll: 1,
	});
});

// $(document).ready(function () {
// 	$('.slider-btn').slick({
// 		centerMode: true,
// 		centerPadding: '60px',
// 		dots: true,
// 		autoplaySpeed: 2500,

// 		arrows: true
// 	});
// });


function loadMenu() {
	var data_menu = JSON.parse(localStorage.getItem('menu'))
	var data_food = ''
	var data_drink = ''
	for (i in data_menu) {
		var menu_item = `	<div class="card border-warning mb-3 col-11 mx-auto rounded my-2 p-3" onClick="addToCart(` + data_menu[i].id + `)">
		<div class="d-flex justify-content-start align-items-center">
			<div class="col-sm-4">
				<img src="img/menu/` + data_menu[i].foto + `" style="width: 120px; background-color: #FFEFDF;" class="card-img img-fluid" alt="card image">
				
			</div>
		<div class="col-sm-8">
				<p class="menu-name">` + data_menu[i].nama + `</p>
				<p class="detail">` + data_menu[i].detail + `</p>
				<span class="menu-price">Rp. ` + formatRupiah(data_menu[i].harga) + `</span>
			
				<a class="btn btn-warning float-right btn-tambah">
				<i class="fas fa-plus"></i>
				</a>
		</div>
	</div>
</div>`
		if (data_menu[i].kategori == 'food') {
			data_food += menu_item
		} else if (data_menu[i].kategori == 'drink') {
			data_drink += menu_item
		}
	}
	$("#food-menu").html(data_food)
	$("#drink-menu").html(data_drink)
}

function loadCart() {
	// cart page data
	var cart = []
	var data_cart = ''
	var total_cart = 0
	if (localStorage.cart) {
		cart = JSON.parse(localStorage.getItem('cart'))
		$("#cart-info").show()
		for (i in cart) {
			var nominal = cart[i].jumlah * cart[i].harga
			data_cart += `<div class="col-12 text-center">
			<img src="img/menu/` + cart[i].foto + `" style="width: 80%" class="card-img img-fluid pt-2" alt="card image">
		</div>
		<div class="cart-item row my-1">
			<div class="col-6 text-left" style="padding-left:30px;">
				<span class="menu-name">` + cart[i].nama + `</span>
			</div>

			<div class="col-6 text-right" style="padding-right:30px;">
				` + formatRupiah(nominal) + `

			</div>
		</div>

		<div class="col-12 pl-0 text-right">
			<a href="javascript:void(0)" class="btn btn-sm btn-warning btn-cart-action" title="Kurangi"
				onClick="minNumCart(` + cart[i].id + `)"><i class="fa fa-minus"></i></a>
			<span class="px-1">` + cart[i].jumlah + `</span>
			<a href="javascript:void(0)" class="btn btn-sm btn-warning btn-cart-action" title="Tambah"
				onClick="addNumCart(` + cart[i].id + `)"><i class="fa fa-plus"></i></a>
			<a href="javascript:void(0)" class="btn btn-sm btn-danger btn-cart-action" title="Hapus"
				onClick="deleteCart(` + cart[i].id + `)"><i class="fa fa-trash"></i></a>
		</div>`
			total_cart = total_cart + nominal

			$("#cart-content").html(data_cart)
			$("#total-cart").html(formatRupiah(total_cart))

			var ppn = total_cart * 10 / 100
			ppn = parseInt(ppn)
			$("#ppn").html(formatRupiah(ppn))

			var total_bayar = total_cart + ppn
			$("#total-bayar").html(formatRupiah(total_bayar))
		}
	} else {
		$("#cart-info").hide()
		data_cart += `<div class="alert alert-danger">Keranjang anda masih kosong.</div>`
		$("#cart-content").html(data_cart)
	}


	// cart icon in home
	if (!localStorage.cart) {
		$("#cart_num").hide()
		$("#cart_num_menu").hide()
	} else {
		$("#cart_num").show()
		$("#cart_num_menu").show()
		$("#cart_num").html(cart.length)
		$("#cart_num_menu").html(cart.length)
	}
}

function loadOrder() {
	var order = []
	var data_order = ''
	if (localStorage.order) {
		order = JSON.parse(localStorage.getItem('order'))
		for (i in order) {
			// hitung total dahulu
			var total_pesanan = 0
			for (j in order[i].menu) {
				var nominal = order[i].menu[j].jumlah * order[i].menu[j].harga
				total_pesanan = total_pesanan + nominal
			}
			var ppn = parseInt(total_pesanan * 10 / 100)
			var total_bayar = total_pesanan + ppn

			var date = new Date(order[i].tanggal)
			date = date.getDate() + ' ' + numToMonth(date.getMonth()) + ' ' + date.getFullYear() + ' pukul ' + date.getHours() + ':' + date.getMinutes()
			data_order += `<div class="order-item my-2" onClick="showOrder(` + order[i].id + `)">
							<div class="card">
								<div class="card-body">
									<div class="row">
										<div class="col-3">
											<img src="img/menu/` + order[i].menu[0].foto + `" class="img-fluid">
										</div>
										<div class="col-9">
											<h5 class="menu-name">` + order[i].menu[0].nama + `</h5>
											<p class="menu-price text-right">Rp ` + formatRupiah(order[i].menu[0].harga) + ` x ` + order[i].menu[0].jumlah + `</p>
											<hr class="m-0" />
											<p class="text-right"><small>` + order[i].menu.length + ` Item</small></p>
										</div>

										<div class="col-8 text-right">
											<b>TOTAL</b>
										</div>
										<div class="col-4 text-right">
											Rp ` + formatRupiah(total_bayar) + `
										</div>

										<div class="col-12">
											<small><i>Dipesan pada <b>` + date + `</b></i></small>
										</div>
									</div>
								</div>
							</div>
						</div>`
		}
	} else {
		data_order += `
		<div class="pt-5 text-center" style="position:absolute; top50%; left:50%; transform: translate(-50%, 50%);">
		<img src="img/history.png" class="mx-auto d-block">		
		<h5 class="mt-2">Belum ada pesanan</h5>
		<p>Yuk order dulu</p>
		</div>`
	}
	$("#order-content").html(data_order)
}

function loadProfile() {
	if (liff.isLoggedIn()) {
		$("#profile-wrapper").show()
		$("#not-login").hide()
		liff.getProfile().then(function (profile) {
			user = profile
			$('#profile-user-id').html(profile.userId)
			$('#profile-display-name').html(profile.displayName)
			$('#profile-photo img').attr('src', profile.pictureUrl)
			$("#profile-status-msg").html(profile.statusMessage)

			$("#profile-os").html(liff.getOS())
			if (liff.isInClient()) {
				$("#profile-line-v").html(liff.getLineVersion())
			} else {
				$("#profile-line-v").html('<small><i>Tidak terbuka di LINE</i></small>')
			}

		}).catch(function (error) {
			$("#modal-message").html('Error: ' + error)
			$("#modalAlert").modal('show')
		});
	} else {
		$("#profile-wrapper").hide()
		$("#not-login").show()
	}
}

function addToCart(id_menu) {
	// cek cart
	var cart = ''
	if (localStorage.cart) {
		cart = JSON.parse(localStorage.getItem('cart'))
		for (i in cart) {
			if (cart[i].id == id_menu) {
				$("#modal-message").html('Menu sudah ada dalam keranjang')
				$("#modalAlert").modal('show')
				return false
			}
		}
	} else {
		cart = []
	}

	// penambahan cart
	var data_menu = JSON.parse(localStorage.getItem('menu'))
	var cart_item = ''
	for (i in data_menu) {
		if (data_menu[i].id == id_menu) {
			cart_item = {
				id: data_menu[i].id,
				nama: data_menu[i].nama,
				kategori: data_menu[i].kategori,
				harga: data_menu[i].harga,
				foto: data_menu[i].foto,
				jumlah: 1
			}
		}
	}
	cart.push(cart_item)
	localStorage.setItem('cart', JSON.stringify(cart))
	setPage('cart')
}

function deleteCart(id_menu) {
	var cart = JSON.parse(localStorage.getItem('cart'))
	var index = 0
	for (i in cart) {
		if (cart[i].id == id_menu) {
			cart.splice(index, 1)
		}
		index++
	}
	localStorage.setItem('cart', JSON.stringify(cart))
	if (cart.length == 0) {
		localStorage.removeItem('cart')
	}
	loadCart()
}

function addNumCart(id_menu) {
	var cart = JSON.parse(localStorage.getItem('cart'))
	var cart_item = ''
	var index = 0
	for (i in cart) {
		if (cart[i].id == id_menu) {
			cart_item = {
				id: cart[i].id,
				nama: cart[i].nama,
				kategori: cart[i].kategori,
				harga: cart[i].harga,
				foto: cart[i].foto,
				jumlah: cart[i].jumlah + 1
			}
			cart.splice(index, 1) // dihapus, habis itu push lagi
		}
		index++
	}
	cart.push(cart_item)
	localStorage.setItem('cart', JSON.stringify(cart))
	loadCart()
}

function minNumCart(id_menu) {
	var cart = JSON.parse(localStorage.getItem('cart'))
	var cart_item = ''
	var index = 0
	for (i in cart) {
		if (cart[i].id == id_menu) {
			cart_item = {
				id: cart[i].id,
				nama: cart[i].nama,
				kategori: cart[i].kategori,
				harga: cart[i].harga,
				foto: cart[i].foto,
				jumlah: cart[i].jumlah - 1
			}
			cart.splice(index, 1) // dihapus, habis itu push lagi
		}
		index++
	}
	cart.push(cart_item)
	localStorage.setItem('cart', JSON.stringify(cart))

	// kalau 0 hapus dari list
	if (cart_item.jumlah == 0) {
		deleteCart(cart_item.id)
	}
	loadCart()
}

function addOrder() {
	// ambil semua item dari cart, push ke local storage order, kosongkan cart
	if (localStorage.cart) {
		var cart = JSON.parse(localStorage.getItem('cart'))
		var order = []
		var order_item = {}
		var index = 0
		if (localStorage.order) {
			order = JSON.parse(localStorage.getItem('order'))
			index = order.length
		}
		var timestamp = new Date
		order_item = {
			id: index + 1,
			tanggal: timestamp,
			menu: cart
		}
		order.push(order_item)
		localStorage.setItem('order', JSON.stringify(order))
		localStorage.removeItem('cart')
		setPage('order')

		// message

		var msg_order = ''
		if (liff.isLoggedIn()) {
			msg_order += user.displayName + ' membuat pesanan baru! '
		} else {
			msg_order += 'Anda membuat pesanan baru! '
		}

		var total_pesanan = 0
		for (i in cart) {
			var nominal = cart[i].jumlah * cart[i].harga
			total_pesanan = total_pesanan + nominal

			msg_order += cart[i].nama + ' (' + cart[i].jumlah + ')'
			if (i == cart.length - 2) { // mengatasi koma komaan
				msg_order += ' dan '
			} else if (i == cart.length - 1) {
				msg_order += ''
			} else {
				msg_order += ', '
			}

		}

		
		var ppn = parseInt(total_pesanan * 10 / 100)
		var total_bayar = total_pesanan + ppn
		msg_order += ' dengan total pesanan Rp ' + formatRupiah(total_bayar) + '. Terima kasih banyak!'


		if (!liff.isInClient()) {
			$("#modal-message").html(msg_order)
			$("#modalAlert").modal('show')
		} else {
			liff.sendMessages([{
				'type': 'text',
				'text': msg_order
			}]).catch(function (error) {
				$("#modal-message").html('Error sending message: ' + error)
				$("#modalAlert").modal('show')
			})
		}

	} else {
		$("#modal-message").html('Anda belum memilih menu')
		$("#modalAlert").modal('show')
	}
}

function showOrder(id) {
	setPage('order-detail')
	var order = JSON.parse(localStorage.getItem('order'))
	var order_item = []
	for (i in order) {
		if (order[i].id == id) {
			order_item = order[i]
		}
	}

	var datetime = new Date(order_item.tanggal)
	var date = datetime.getDate() + ' ' + numToMonth(datetime.getMonth()) + ' ' + datetime.getFullYear()
	var time = datetime.getHours() + ':' + datetime.getMinutes()
	$("#tanggal-detail-order").html(date)
	$("#jam-detail-order").html(time)

	var data_order_detail = ''
	var total_order_detail = 0
	for (i in order_item.menu) {
		var nominal = order_item.menu[i].harga * order_item.menu[i].jumlah
		total_order_detail = total_order_detail + nominal
		data_order_detail += `<div class="order-detail-item row my-1">
								<div class="col-4 pr-0">
									<span class="menu-name">` + order_item.menu[i].nama + `</span>
								</div>
								<div class="col-3 px-0 text-right">
									<span class="px-1">` + formatRupiah(order_item.menu[i].harga) + `</span>
								</div>
								<div class="col-2 px-0">
									<span class="px-1"> x ` + order_item.menu[i].jumlah + `</span>
								</div>
								<div class="col-3 pl-0 text-right">
									` + formatRupiah(nominal) + `
								</div>
							</div>`
	}
	$("#order-detail-content").html(data_order_detail)
	$("#total-order-detail").html(formatRupiah(total_order_detail))

	var ppn = parseInt(total_order_detail * 10 / 100)
	$("#ppn-order-detail").html(formatRupiah(ppn))

	var total_bayar = total_order_detail + ppn
	$("#total-bayar-order-detail").html(formatRupiah(total_bayar))
}

function clearTransaction() {
	localStorage.removeItem('cart')
	localStorage.removeItem('order')

	$("#modal-message").html('Data transaksi berhasil dihapus')
	$("#modalAlert").modal('show')
}

function liffOpenWindow() {
	if (!liff.isInClient()) {
		$("#modal-message").html('Fungsi ini tidak tersedia pada browser eksternal')
		$("#modalAlert").modal('show')
	} else {
		liff.openWindow({
			url: 'https://liff.line.me/1655801536-RlMGz8oK',
			external: true
		})
	}
}

function liffCloseApp() {
	if (!liff.isInClient()) {
		$("#modal-message").html('Fungsi ini tidak tersedia pada browser eksternal')
		$("#modalAlert").modal('show')
	} else {
		liff.closeWindow()
	}
}

function liffLogin() {
	if (!liff.isLoggedIn()) {
		liff.login()
	}
}

function liffLogout() {
	if (liff.isLoggedIn()) {
		if (liff.isInClient()) {
			$("#modal-message").html('Fitur logout tersedia untuk browser eksternal')
			$("#modalAlert").modal('show')
		} else {
			liff.logout()
			window.location.reload()
		}
	}
}


function formatRupiah(angka) {
	var angka = angka.toString()

	var number_string = angka.replace(/[^,\d]/g, '').toString(),
		split = number_string.split('.'),
		sisa = split[0].length % 3,
		rupiah = split[0].substr(0, sisa),
		ribuan = split[0].substr(sisa).match(/\d{3}/gi);

	// tambahkan titik jika yang di input sudah menjadi angka ribuan
	if (ribuan) {
		separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}


	rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
	return rupiah
}

function numToMonth(bulan) {
	switch (bulan) {
		case 1:
			bulan = "Januari";
			break
		case 2:
			bulan = "Februari";
			break
		case 3:
			bulan = "Maret";
			break
		case 4:
			bulan = "April";
			break
		case 5:
			bulan = "Mei";
			break
		case 6:
			bulan = "Juni";
			break
		case 7:
			bulan = "Juli";
			break
		case 8:
			bulan = "Agustus";
			break
		case 9:
			bulan = "September";
			break
		case 10:
			bulan = "Oktober";
			break
		case 11:
			bulan = "November";
			break
		case 12:
			bulan = "Desember";
			break
	}
	return bulan
}