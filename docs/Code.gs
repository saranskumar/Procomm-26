/**
 * PROCOMM '26 — Google Apps Script Backend (Code.gs)
 * 
 * Features:
 * 1. Appends team registrations to a Google Sheet with headers.
 * 2. Saves uploaded project proposal PDF files to a dedicated Google Drive folder.
 * 3. Formats proposal files in Google Sheet as clickable `=HYPERLINK(fileUrl, fileName)` links.
 * 
 * Authorization Step (CRITICAL):
 * Select 'testDriveAndSheet' from the function dropdown at the top and click 'Run' once.
 * Google will ask you to authorize Google Drive permissions. Click Allow.
 */

// Google Drive Folder ID for uploaded proposal PDFs
var DRIVE_FOLDER_ID = "1rOGTZyk2pZ6H7vvvMDGPQ6DWkCSEAcVR";

// Run this once inside Apps Script Editor to grant Google Drive & Sheet permissions
function testDriveAndSheet() {
  var folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  Logger.log("Successfully connected to Drive Folder: " + folder.getName());
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  Logger.log("Successfully connected to Sheet: " + sheet.getName());
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var data = {};

    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Ensure Headers Exist on Row 1
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Team Name",
        "Problem Statement",
        "Team Size",
        // Leader
        "Leader Name",
        "Leader College",
        "Leader Semester",
        "Leader Phone",
        "Leader Email",
        "Leader IEEE Member?",
        "Leader IEEE ID",
        "Leader ComSoc Member?",
        // Member 2
        "Member 2 Name",
        "Member 2 College",
        "Member 2 Semester",
        "Member 2 Email",
        "Member 2 IEEE Member?",
        "Member 2 IEEE ID",
        "Member 2 ComSoc Member?",
        // Member 3
        "Member 3 Name",
        "Member 3 College",
        "Member 3 Semester",
        "Member 3 Email",
        "Member 3 IEEE Member?",
        "Member 3 IEEE ID",
        "Member 3 ComSoc Member?",
        // Member 4
        "Member 4 Name",
        "Member 4 College",
        "Member 4 Semester",
        "Member 4 Email",
        "Member 4 IEEE Member?",
        "Member 4 IEEE ID",
        "Member 4 ComSoc Member?",
        // Proposal File Link
        "Proposal PDF File (Clickable Link)"
      ]);

      // Format header row bold with background color
      var headerRange = sheet.getRange(1, 1, 1, 34);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#0B1A30");
      headerRange.setFontColor("#FAF7E6");
    }

    // Process PDF File Upload to Google Drive
    var fileUrl = "No file uploaded";
    var fileName = "N/A";

    if (data.fileBase64 && data.fileName) {
      try {
        var cleanTeamName = (data.teamName || "Team").replace(/[^a-zA-Z0-9_\-]/g, "");
        fileName = "(" + cleanTeamName + ")" + data.fileName;

        var base64Clean = data.fileBase64;
        if (base64Clean.indexOf(",") !== -1) {
          base64Clean = base64Clean.split(",")[1];
        }

        var fileBlob = Utilities.newBlob(
          Utilities.base64Decode(base64Clean),
          data.fileMimeType || "application/pdf",
          fileName
        );

        var folder;
        if (DRIVE_FOLDER_ID && DRIVE_FOLDER_ID !== "") {
          folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
        } else {
          folder = DriveApp.getRootFolder();
        }

        var file = folder.createFile(fileBlob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        fileUrl = file.getUrl();
      } catch (fileErr) {
        fileUrl = "Upload error: " + fileErr.toString();
      }
    }

    // Construct Clickable Hyperlink Cell Formula
    var proposalCell = fileName;
    if (fileUrl && fileUrl.indexOf("http") === 0) {
      proposalCell = '=HYPERLINK("' + fileUrl + '", "' + fileName + '")';
    } else if (fileUrl.indexOf("Upload error") === 0) {
      proposalCell = fileName + " [" + fileUrl + "]";
    }

    // Extract Leader Details
    var leader = data.leader || {};

    // Extract Member Details safely
    var members = data.members || [];
    var m2 = members[0] || {};
    var m3 = members[1] || {};
    var m4 = members[2] || {};

    // Construct Sheet Row Data
    var rowData = [
      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.teamName || "",
      data.problemStatement || "",
      data.teamSize || 1,
      // Leader
      leader.name || "",
      leader.college || "",
      leader.semester || "",
      leader.phone || "",
      leader.email || "",
      leader.isIeeeMember ? "Yes" : "No",
      leader.membershipId || "",
      leader.isComsocMember ? "Yes" : "No",
      // Member 2
      data.teamSize >= 2 ? (m2.name || "") : "N/A",
      data.teamSize >= 2 ? (m2.college || "") : "N/A",
      data.teamSize >= 2 ? (m2.semester || "") : "N/A",
      data.teamSize >= 2 ? (m2.email || "") : "N/A",
      data.teamSize >= 2 ? (m2.isIeeeMember ? "Yes" : "No") : "N/A",
      data.teamSize >= 2 ? (m2.membershipId || "") : "N/A",
      data.teamSize >= 2 ? (m2.isComsocMember ? "Yes" : "No") : "N/A",
      // Member 3
      data.teamSize >= 3 ? (m3.name || "") : "N/A",
      data.teamSize >= 3 ? (m3.college || "") : "N/A",
      data.teamSize >= 3 ? (m3.semester || "") : "N/A",
      data.teamSize >= 3 ? (m3.email || "") : "N/A",
      data.teamSize >= 3 ? (m3.isIeeeMember ? "Yes" : "No") : "N/A",
      data.teamSize >= 3 ? (m3.membershipId || "") : "N/A",
      data.teamSize >= 3 ? (m3.isComsocMember ? "Yes" : "No") : "N/A",
      // Member 4
      data.teamSize >= 4 ? (m4.name || "") : "N/A",
      data.teamSize >= 4 ? (m4.college || "") : "N/A",
      data.teamSize >= 4 ? (m4.semester || "") : "N/A",
      data.teamSize >= 4 ? (m4.email || "") : "N/A",
      data.teamSize >= 4 ? (m4.isIeeeMember ? "Yes" : "No") : "N/A",
      data.teamSize >= 4 ? (m4.membershipId || "") : "N/A",
      data.teamSize >= 4 ? (m4.isComsocMember ? "Yes" : "No") : "N/A",
      // Single Clickable Hyperlink Column
      proposalCell
    ];

    sheet.appendRow(rowData);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", driveUrl: fileUrl }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

// Handle preflight OPTIONS requests for CORS
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "PROCOMM '26 Registration API Active" }))
    .setMimeType(ContentService.MimeType.JSON);
}
