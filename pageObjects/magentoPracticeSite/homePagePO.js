class HomePage {

    constructor(page)
    {
        this.page = page;
        this.mainContent = page.locator("#maincontent");
    } 

}
module.exports = {HomePage};