using Google.Apis.Sheets.v4.Data;
using Microsoft.AspNetCore.Mvc;
using TesourariaSAF.BackEnd.Services;

namespace TesourariaSAF.BackEnd
{
    [ApiController]
    [Route("[Controller]")]
    public class CrudBaseController : ControllerBase
    {
        #region Fields
        private readonly GoogleSheetsService _googleSheetsService;
        #endregion

        #region Constructor
        public CrudBaseController(GoogleSheetsService googleSheetsService)
        {
            _googleSheetsService = googleSheetsService;
        }
        #endregion

        #region Members 'Actions' :: HttpGet, HttpPost, HttpPut, HttpDelete

        #region Get
        [HttpGet("sheets")]
        public IActionResult GetAll()
        {
            string sheets = "1fX_kB4MPMF7ofT9HFwJA7LQLB7CqVmYx_df9fqyS7Io";

            var request = _googleSheetsService.GetService().Spreadsheets.Get(sheets);

            var response = request.Execute();

            return Ok(response.Sheets.Select(x => new { x.Properties.Title, x.Properties.SheetId }));
        }

        [HttpGet("sheet/{sheetId:int}")]
        public IActionResult GetSheetValues(int sheetId)
        {
            string spreadSheetId = "1fX_kB4MPMF7ofT9HFwJA7LQLB7CqVmYx_df9fqyS7Io";

            var request = _googleSheetsService.GetService().Spreadsheets.Get(spreadSheetId);

            var response = request.Execute();

            Sheet? sheet = response.Sheets.FirstOrDefault(x => x.Properties.SheetId == sheetId);

            if (sheet is null)
                return NotFound("Nenhuma página encontrada");

            List<GridRange> merges = sheet.Merges.Skip(6).ToList();

            GridRange? firstRange = merges.FirstOrDefault();
            GridRange? lastRange = merges.LastOrDefault();

            string range = $"{sheet.Properties.Title}!A{firstRange.StartRowIndex + 1}:G{lastRange.EndRowIndex + 1}";

            ValueRange values = _googleSheetsService.GetService().Spreadsheets.Values.Get(spreadSheetId, range).Execute();

            return Ok(values);
        }

        [HttpGet("{sheetName}/{rowsColumns}")]
        public IActionResult Get(string sheetName, string rowsColumns)
        {
            string sheets = "1fX_kB4MPMF7ofT9HFwJA7LQLB7CqVmYx_df9fqyS7Io";
            string range = $"{sheetName}!{rowsColumns}";

            var request = _googleSheetsService.GetService().Spreadsheets.Values.Get(sheets, range);

            ValueRange result = request.Execute();

            return Ok(result);
        }

        [HttpPost("copyTo")]
        public IActionResult CopyTo()
        {

            string spreadSheetId = "1fX_kB4MPMF7ofT9HFwJA7LQLB7CqVmYx_df9fqyS7Io";

            var request = _googleSheetsService.GetService().Spreadsheets.Sheets.CopyTo(
                new CopySheetToAnotherSpreadsheetRequest() { DestinationSpreadsheetId = spreadSheetId }, spreadSheetId, 681219295);

            SheetProperties result = request.Execute();

            return Ok(result.GridProperties);
        }

        [HttpPost("{sheetName}")]
        public IActionResult CreateSheet(string sheetName)
        {
            string spreadSheetId = "1fX_kB4MPMF7ofT9HFwJA7LQLB7CqVmYx_df9fqyS7Io";

            var request = _googleSheetsService.GetService().Spreadsheets.BatchUpdate(
                new BatchUpdateSpreadsheetRequest() { Requests = new List<Request> { new Request { AddSheet = new AddSheetRequest { Properties = new SheetProperties { Title = sheetName } } } } },
                spreadSheetId);

            request.Execute();

            return Ok("Página criada");
        }
        #endregion

        #endregion
    }
}
