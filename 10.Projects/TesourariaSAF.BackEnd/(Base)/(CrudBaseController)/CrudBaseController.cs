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
        [HttpGet("read")]
        public IActionResult Get()
        {
            string sheets = "126bbypMATPCiy0dABy2iUXCBBjDFsRUw4kCBXaAkTBM";
            string range = "Página1!A:C";

            var request = _googleSheetsService.GetService().Spreadsheets.Values.Get(sheets, range);

            ValueRange result = request.Execute();

            return Ok(result);
        }
        #endregion

        #endregion
    }
}
