using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;

namespace TesourariaSAF.BackEnd.Services
{
    public class GoogleSheetsService
    {
        #region Fields
        private readonly SheetsService _sheetsService;
        #endregion

        #region Constructor
        public GoogleSheetsService()
        {
            GoogleCredential credential;

            using (var stream = new FileStream("credentials.json", FileMode.Open, FileAccess.Read))
            {
                credential = GoogleCredential.FromStream(stream)
                    .CreateScoped(SheetsService.Scope.Spreadsheets);
            }

            _sheetsService = new SheetsService(
                new BaseClientService.Initializer
                {
                    HttpClientInitializer = credential,
                    ApplicationName = "Tesouraria SAF - IPBFaz"
                });
        }
        #endregion

        #region Getters :: GetService()
        public SheetsService GetService()
        {
            return _sheetsService; 
        }
        #endregion
    }
}
