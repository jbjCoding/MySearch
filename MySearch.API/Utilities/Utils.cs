using MySearch.API.DAL;
using OfficeOpenXml;

namespace MySearch.API.Utilities
{
    public static class Utils
    {
        private const string FILE_PATH = @"..\..\..\Exports\export.xlsx";

        internal static void ExportSearchItemsToExcel(List<SearchResult> lastQueryItems)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            ExcelPackage excel = new ExcelPackage();

            var worksheet = excel.Workbook.Worksheets.Add("SearchResults");

            PrepareWorksheet(lastQueryItems, worksheet);

            CreateFileOnDisk(excel);

            excel.Dispose();
        }

        private static void CreateFileOnDisk(ExcelPackage excel)
        {
            string currentDirectory = AppDomain.CurrentDomain.BaseDirectory;
            string file = Path.Combine(currentDirectory, FILE_PATH);
            string filePath = Path.GetFullPath(file);

            if (File.Exists(filePath))
                File.Delete(filePath);

            FileStream fileStream = File.Create(filePath);
            fileStream.Close();

            File.WriteAllBytes(filePath, excel.GetAsByteArray());
        }

        private static void PrepareWorksheet(List<SearchResult> lastQueryItems, ExcelWorksheet worksheet)
        {
            worksheet.TabColor = System.Drawing.Color.Black;
            worksheet.DefaultRowHeight = 12;

            worksheet.Cells[1, 1].Value = nameof(SearchResult.Title);
            worksheet.Cells[1, 2].Value = nameof(SearchResult.Link);
            worksheet.Cells[1, 3].Value = nameof(SearchResult.Snippet);

            int index = 2;
            foreach (var searchItem in lastQueryItems)
            {
                worksheet.Cells[index, 1].Value = searchItem.Title;
                worksheet.Cells[index, 2].Value = searchItem.Link;
                worksheet.Cells[index, 3].Value = searchItem.Snippet;
                index++;
            }
        }
    }
}
