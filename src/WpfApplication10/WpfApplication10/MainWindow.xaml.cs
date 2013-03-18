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

namespace WpfApplication10
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        int countingtitle=0; //zodat die datum enzo er maar 1 keer opstaat

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
                    debug.Items.Add(Path.GetFileName(file));
                    
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
                        if (countingtitle==0 || line.ToString().Contains("Date") == false)
                        {
                            debug2.Items.Add(line);
                            countingtitle = 1; //zo komt er dus maar 1 keer die datum in
                        }
                    }
                }
            }
                
            

        }

        private void wDocument_Click(object sender, RoutedEventArgs e)
        {
            debug2.SelectAll();
            string test = debug2.SelectedItems.ToString();
            foreach (var VARIABLE in debug2.SelectedItems)
            {
            }
            //MessageBox.Show(test);
            
        }
    }
}
