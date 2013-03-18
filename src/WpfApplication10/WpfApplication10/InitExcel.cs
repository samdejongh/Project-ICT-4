/*
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Office.Interop.Excel;
namespace WpfApplication10
{
    class InitExcel
    {
        public Microsoft.Office.Interop.Excel.Application xlApp;
        public Microsoft.Office.Interop.Excel.Workbook xlWorkBook;
        public Microsoft.Office.Interop.Excel.Worksheet xlWorkSheet;
        public Microsoft.Office.Interop.Excel.Range range;
        public object misValue = System.Reflection.Missing.Value;

        public void Init()
        {
            xlApp = new Microsoft.Office.Interop.Excel.Application();
            xlWorkBook = xlApp.Workbooks.Open("email.xls", 0, false, 5, "", "", false, Microsoft.Office.Interop.Excel.XlPlatform.xlWindows, "", true, false, 0, true, false, false);

            xlWorkSheet = (Microsoft.Office.Interop.Excel.Worksheet)xlWorkBook.Worksheets.get_Item(1);
            range = xlWorkSheet.UsedRange;
        }

        public void Close()
        {
            xlWorkBook.Close(true, misValue, misValue);
            xlApp.Quit();

            releaseObject(xlWorkSheet);
            releaseObject(xlWorkBook);
            releaseObject(xlApp);
        }

        private void releaseObject(object obj)
        {
            try
            {
                System.Runtime.InteropServices.Marshal.ReleaseComObject(obj);
                obj = null;
            }
            catch (Exception ex)
            {
                obj = null;
                MessageBox.Show("Het object kan niet weergegeven worden " + ex.ToString());
            }
            finally
            {
                GC.Collect();
            }
        }
    }
}
*/
