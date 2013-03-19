using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Forms;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Microsoft.Win32;
using MessageBox = System.Windows.MessageBox;
using Path = System.IO.Path;
using OfficeOpenXml;

namespace WpfApplication10
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        int countingtitle = 0; //zodat die datum enzo er maar 1 keer opstaat
        List<string> words;
        int teller;


        public MainWindow()
        {
            InitializeComponent();
        }

        private void rFolder_Click(object sender, RoutedEventArgs e)
        {
            FolderBrowserDialog folder = new FolderBrowserDialog();
            folder.ShowDialog();
            if (folder.SelectedPath != string.Empty)
            {
                string[] files = Directory.GetFiles(folder.SelectedPath);
                foreach (var file in files)
                {
                    debug.Items.Add(file);//dit werk wel maar ni voor de volgende stap
                    // ik heb effe zitte sukkelen me nen databinder naar de listbox maar da                                                                                                      was zo veel gezever da
                    //ik da heb opgegeven
                }
            }
        }
        private void Debug_OnSelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            debug2.Items.Clear(); //anders blijft er meer en meer bijkomen bij een verandering
            countingtitle = 0;

            for (int i = 0; i < debug.SelectedItems.Count; i++)
            {
                using (StreamReader reader = new StreamReader(Convert.ToString(debug.SelectedItems[i]))) //vanaf hier gewoon simpelweg elke selecteditem in die 2delistbox zetten (debug2)
                {
                    string line;
                    while ((line = reader.ReadLine()) != null)
                    {
                        if (countingtitle == 0 || line.ToString().Contains("Date") == false)
                        {
                            debug2.Items.Add(line);
                            countingtitle = 1; //zo komt er dus maar 1 keer die datum in
                        }
                    }
                }
            }

            stringSplit();
        }

        private void wDocument_Click(object sender, RoutedEventArgs e)
        {
            AddtoExcel2();
            //debug2.SelectAll();
            //string test = debug2.SelectedItems.ToString();
            //foreach (var VARIABLE in debug2.SelectedItems)
            {
            }
            //MessageBox.Show(test);
        }

        void stringSplit()
        {
            for (int i = 0; i < debug2.Items.Count; i++)
            {
                string s = Convert.ToString(debug2.Items[i]);

            }
        }

        void AddtoExcel2()
        {
            FileInfo newFile = new FileInfo(@"C:\Users\brent\Documents\mynewfile.xlsx");
            using (ExcelPackage xlPackage = new ExcelPackage(newFile))
            {
                ExcelWorksheet worksheet = xlPackage.Workbook.Worksheets.Add("sheet 2");
                //worksheet.Cell(1, 1).Value = "";
                xlPackage.Workbook.Properties.Title = "Titel";
                xlPackage.Workbook.Properties.Author = "Maker";
                xlPackage.Save();
            }
        }

        private void sAll_Click(object sender, RoutedEventArgs e)
        {
            debug.SelectAll();
        }

        private void MenuItem_OnClick(object sender, RoutedEventArgs e)//exit button van menu
        {
            MessageBoxResult dialogResult = MessageBox.Show(@"Do you want to quit?", @"Sure", MessageBoxButton.YesNo);
            
            //vraag ineen message box

            if (dialogResult == MessageBoxResult.Yes)
            {
                Close();//afsluiten van het programma
            }


        }

        private void About(object sender, RoutedEventArgs e)
        {
            MessageBox.Show(
                "This software is coded by Brent and Senne \nIf you want to use this software please contact us",
                "About");
        }

        private void Export_Click(object sender, RoutedEventArgs e)
        {
            StreamWriter myOutputStream = new StreamWriter(@"C:\Users\brent\Documents\Myfile.txt");
            foreach (var item in debug2.Items)
            {
                myOutputStream.WriteLine(item.ToString());
            }

            myOutputStream.Close();
        }
    }
}
