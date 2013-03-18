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

namespace WpfApplication10
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
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
                    debug.Items.Add(file);
                }
            }
        }

        private void Debug_OnSelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            debug.SelectedItems.ToString();
        }
    }
}
