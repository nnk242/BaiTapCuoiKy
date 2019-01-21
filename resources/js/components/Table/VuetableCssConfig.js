export default {
	table: {
		tableClass: 'table table-striped table-bordered',
		ascendingIcon: 'fas fa-angle-up',
		descendingIcon: 'fas fa-angle-down',
		handleIcon: 'fas fa-bars',
		renderIcon: function(classes, options) {
			return `<span class="${classes.join(' ')}"></span>`
		}
	},
	pagination: {
		wrapperClass: "pagination pull-right",
		activeClass: "btn-primary",
		disabledClass: "disabled",
		pageClass: "btn btn-border",
		linkClass: "btn btn-border",
		icons: {
			first: "",
			prev: "",
			next: "",
			last: ""
		}
	}
}
