module.exports = {
    //Login
    login_home_header:                  "xpath=//ul[@class='header-links header-options']//a//span[contains(text(), 'Login')]",
    login_submit_button:                "xpath=//button[@type='submit']",
    login_submit_button_Rijksstudio:    "xpath=//input[@data-uitest='user-submit-login']",
    login_email_input:                  "xpath=//input[@id='email']",
    login_password_input:               "xpath=//input[@id='wachtwoord']",

    //Search results
    search_results_view_all:            "xpath=//h2[contains(text(),'Works of art')]//following-sibling::a",

    //Advanced search
    advanced_search_material:           "xpath=//input[@id='token-input-QueryDescriptor_AdvancedSearchOptions_ObjectCriteria_Material']",
    advanced_search_searchbar:          "xpath=//input[@id='advanced-search-field']",

    //'task1_1_UI'
    search_results:                     "xpath=//p[@class='search-results-count']",

    //Profile settings
    profile_settings_profile_pic_input: "xpath=//input[contains(@accept,'image/jpeg')]",
    profile_settings_upload_profile:    "xpath=//a[@id='upload-file-button']",
    profile_settings_profile_pic_save:  "xpath=//label[text()='Choose your cutout']/parent::fieldset/following-sibling::fieldset//button[contains(text(),'Save')]",

    //You need a Rijksstudio account to save this work
    Rijksstudio_account_login_title:    "xpath=//h1[contains(text(),'you need a Rijksstudio')]",
    Rijksstudio_account_login_already_have_account:    "xpath=//button[contains(text(),'I already have a Rijksstudio')]",
  };