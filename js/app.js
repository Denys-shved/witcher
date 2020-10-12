const vw = $(window).width();
const vh = $(window).height();

const fallbackCopyTextToClipboard = (text) => {
	const textArea = document.createElement("textarea");
	textArea.value = text;

	textArea.style.top = "0";
	textArea.style.left = "0";
	textArea.style.position = "fixed";

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		console.log('Fallback: Copying text command was ' + msg);
	} catch (err) {
		console.error('Fallback: Oops, unable to copy', err);
	}

	document.body.removeChild(textArea);
}
const copyTextToClipboard = (text) => {
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text);
		return;
	}
	navigator.clipboard.writeText(text).then(function () {
		console.log('Async: Copying to clipboard was successful!');
	}, function (err) {
		console.error('Async: Could not copy text: ', err);
	});
}

const initParallax = () => {
	const $back = $('.promotion__back');
	const $front = $('.promotion__front');

	const animateElement = ({ pageX, pageY }, target, layer) => {
		const layerCoef = 20 / layer;
		const x = (vw - target[0].offsetWidth) / 2 - (pageX - (vw / 2)) / layerCoef;
		const y = (vh - target[0].offsetHeight) / 2 - (pageY - (vh / 2)) / layerCoef;

		$(target).css({ "-webkit-transform": `translate(${x}px,${y}px)` });
	}

	const onMouseMove = (e) => {
		animateElement(e, $back, 3);
		animateElement(e, $front, 1);
	}
	document.addEventListener("mousemove", onMouseMove)
}

const initHandlers = () => {
	const $copyBtn = $('.promotion__copy');
	const copyText = $('.promotion__discount').text();

	$copyBtn.on('click', () => copyTextToClipboard(copyText));
}

document.addEventListener("DOMContentLoaded", function () {
	initParallax();
	initHandlers();
});
