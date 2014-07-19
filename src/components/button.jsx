/** @jsx React.DOM */

var React = require("react");

var cx = React.addons.classSet;

var KUIButton = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func,

        // Specify if you want the button to act as a link
        href: React.PropTypes.string,

        type: React.PropTypes.oneOf(["button", "submit"]).isRequired,
        label: React.PropTypes.string,

        // Specify either use="primary" (the default), use="secondary", or
        // domainSlug={topic.domainSlug} to color the button appropriately
        use: React.PropTypes.oneOf(["primary", "secondary"]),
        domainSlug: React.PropTypes.string,
        // Specify one of these progress values from UserProgressCache (or
        // somewhere else if it's more convenient). If progress="complete" the
        // button will be shown colored; otherwise it's shown in gray to
        // indicate that it hasn't yet been done.
        progress: React.PropTypes.oneOf(["complete", "started", "unstarted"]),

        // CSS length like "200px" or "100%"
        width: React.PropTypes.string

        // TODO(alpert): "size" prop for big and small buttons (in terms of
        // height/font size)
    },

    getDefaultProps: function() {
        return {
            use: "primary",
            width: "auto",
            progress: "complete"
        };
    },

    getLabel: function() {
        return this.props.label != null ?
            this.props.label :
            this.props.type === "submit" ?
                $._("Submit") :
                "";
    },

    render: function() {
        var domainSlug = this.props.domainSlug;
        var progress = this.props.progress;
        var className = cx({
            "kui-button": true,
            "kui-button-submit": this.props.type === "submit",
            "kui-button-plain": this.props.type === "button",

            "kui-button-primary":
                !domainSlug && this.props.use === "primary",
            "kui-button-secondary":
                !domainSlug && this.props.use === "secondary",

            "kui-button-domain": !!domainSlug,
            "kui-button-complete":
                domainSlug && progress === "complete",
        }) + (domainSlug ? " kui-button-domain-" + domainSlug : "");
        if (this.props.href) {
            return <a
                role="button"
                type={this.props.type}
                onClick={this.props.onClick}
                href={this.props.href}
                className={className}
                style={{width: this.props.width}}>
                {this.getLabel()}
            </a>;
        }
        return <button type={this.props.type}
                onClick={this.props.onClick}
                className={className}
                style={{width: this.props.width}}>
            {this.getLabel()}
        </button>;
    }
});

module.exports = KUIButton;
