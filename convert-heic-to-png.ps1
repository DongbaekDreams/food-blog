$sourceFolder = "C:\Users\jacob\Windsurf\food-blog\public\images\unsorted"
$files = Get-ChildItem -Path $sourceFolder -Filter *.heic

foreach ($file in $files) {
    $pngPath = [System.IO.Path]::ChangeExtension($file.FullName, ".png")
    magick $file.FullName $pngPath
}
