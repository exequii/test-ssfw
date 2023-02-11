SSFramework.initTimeout = function() {
	
	var stateTimeout = States.getProperty("state_timeout") != undefined ? States.getProperty("state_timeout") : this.timeout_secs; // Get the Timeout property from the current state.
	
	var timeoutSecounds = this.timeout_secs != stateTimeout ? stateTimeout : this.timeout_secs; // If Original SSFW TO secounds is different to State TO, will set the StateTimeout Value. Else, will set Original SSFW TO secounds.
	
    this.abortTimeout();

	SSFramework.timeout_enabled = true;

	if (States.CurrentStateData.hasOwnProperty("events") &&
        States.CurrentStateData.events.hasOwnProperty("timeout")) {
 
		this.id_timeout = window.setTimeout(function () {
		SSFramework.fireTimeout();
        }, parseInt(timeoutSecounds) * 1000); // The new timeout secounds will be use to trigger the SSFW TO.
    }
}