import { test, expect, type Page } from "@playwright/test";
import testCaseData from "../../test-data/manage-locations/TC-34.json";
import { GeneratePage } from "../../helpers/generatePage";
import { LocationsPage } from "../../page-objects/abstract-page/abstract-admin-page/LocationsPage";
import { AddLocationsPage } from "../../page-objects/abstract-page/abstract-admin-page/AddLocationPage";
import { EditLocationsPage } from "../../page-objects/abstract-page/abstract-admin-page/EditLocationPage";

test.describe.parallel("Edit note location", () => {
  let page: Page;
  let locationsPage: LocationsPage;
  let addLocationsPage: AddLocationsPage;
  let generatePage: GeneratePage;
  let editLocationPage: EditLocationsPage;

  test.beforeEach(async ({ browser }) => {
    generatePage = new GeneratePage(browser);
    page = await generatePage.createPage(browser);
    locationsPage = new LocationsPage(page);
    addLocationsPage = new AddLocationsPage(page);
    editLocationPage = new EditLocationsPage(page);
  });

  test.afterEach(async ({ page }) => {
    await editLocationPage.clickSave();
    await locationsPage.waitForPageLoad();
    await locationsPage.resetLocation();
    await locationsPage.clickSelectAll();
    await locationsPage.clickDelete();
    await locationsPage.clickConfirmDelete();
    await locationsPage.getLoadSpinner().waitFor({ state: "hidden" });
    await page.close();
  });

  test(`[TC-34] Verify note is edited successfully in edit form`, async () => {
    let random = new Date().toISOString();
    const locationName = testCaseData[0].name + "_" + random;
    const newNote = testCaseData[0].note + "_" + random;

    await test.step("Step 1: Go to Locations Page", async () => {
      await locationsPage.goToLocationsPage();
    });

    await test.step("Step 2: Enter location", async () => {
      await addLocationsPage.addTestData(testCaseData, random, locationsPage);
    });

    await test.step("VP: Verify search successfully", async () => {
      await locationsPage.verifyHaveLocationInTable(
        locationName,
        testCaseData[0].city,
        testCaseData[0].country
      );
    });

    await test.step("Step 5: Click Edit", async () => {
      (await locationsPage.getEditButton(locationName)).click();
    });

    await test.step("Step 6: Edit Note", async () => {
      await editLocationPage.getTitle().waitFor({ state: "visible" });
      await editLocationPage.waitForPageLoad();
      await editLocationPage.editNote(newNote);
    });

    await test.step("Step 7: Click Save", async () => {
      await editLocationPage.clickSave();
      await locationsPage.waitForPageLoad();
    });

    await test.step("Step 10: Click Edit", async () => {
      (await locationsPage.getEditButton(locationName)).click();
    });

    await test.step("VP: Verify edit successfully", async () => {
      await editLocationPage.verifyNoteAfterUpdate(newNote);
    });
  });
});
