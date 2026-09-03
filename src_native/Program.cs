using System;
using System.Diagnostics;
using System.IO;
using System.Net.Sockets;
using System.Threading;
using System.Windows.Forms;

namespace KoliapediaApp {
    static class Program {
        [STAThread]
        static void Main() {
            try {
                string appDir = AppDomain.CurrentDomain.BaseDirectory;

                // 1. Check if server on port 5173 is already running
                bool isPortOpen = false;
                try {
                    using (var client = new TcpClient()) {
                        var result = client.BeginConnect("127.0.0.1", 5173, null, null);
                        isPortOpen = result.AsyncWaitHandle.WaitOne(300);
                        if (isPortOpen && client.Connected) {
                            client.EndConnect(result);
                        }
                    }
                } catch {
                    isPortOpen = false;
                }

                // If not running, start server in background without console window
                if (!isPortOpen) {
                    var startInfo = new ProcessStartInfo {
                        FileName = "cmd.exe",
                        Arguments = "/c npm run dev",
                        WorkingDirectory = appDir,
                        CreateNoWindow = true,
                        UseShellExecute = false,
                        WindowStyle = ProcessWindowStyle.Hidden
                    };
                    Process.Start(startInfo);
                    Thread.Sleep(1200);
                }

                // 2. Locate Edge or Chrome for dedicated standalone window mode
                string edgePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86), @"Microsoft\Edge\Application\msedge.exe");
                if (!File.Exists(edgePath)) {
                    edgePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), @"Microsoft\Edge\Application\msedge.exe");
                }

                string chromePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), @"Google\Chrome\Application\chrome.exe");
                if (!File.Exists(chromePath)) {
                    chromePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86), @"Google\Chrome\Application\chrome.exe");
                }

                string browser = File.Exists(edgePath) ? edgePath : (File.Exists(chromePath) ? chromePath : null);
                string dataDir = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "KoliapediaApp");

                if (browser != null) {
                    var procInfo = new ProcessStartInfo {
                        FileName = browser,
                        Arguments = "--app=http://localhost:5173 --window-size=1260,860 --user-data-dir=\"" + dataDir + "\"",
                        UseShellExecute = true
                    };
                    Process.Start(procInfo);
                } else {
                    Process.Start(new ProcessStartInfo("http://localhost:5173") { UseShellExecute = true });
                }
            } catch (Exception ex) {
                MessageBox.Show("Ошибка при запуске Коляпедии: " + ex.Message, "Коляпедия", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
