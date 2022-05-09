
const xhr = new XMLHttpRequest()
xhr.open('GET', 'http://localhost:3000/api/students')
xhr.responseType = 'json'
xhr.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		console.log(this.response)
		// Generate the dynamic content 
		const body = document.getElementsByTagName('body')[0]
		for (const s of this.response) {
			//
			body.appendChild(document.createElement('br'))
			let c = document.createElement('a')
			let txt = document.createTextNode(s.firstName)
			c.href= '#'
			c.text = s.firstName 
			// c.appendChild(txt)
			body.appendChild(c)
			c = document.createElement('label')
			txt = document.createTextNode(s.lastName)
			c.appendChild(txt)
			body.appendChild(c)
		}
	}
}
xhr.send()