# AfriVoices East Africa Dataset Description

The AfriVoices East Africa dataset contains scripted/read and unscripted/spontaneous speech samples across multiple dialects, regions, accents, and recording conditions. It supports robust ASR development for six East African languages.

| Language | ISO Code | Dialects Included | Read Hours | Spontaneous Hours | Total Hours |
| --- | --- | --- | ---: | ---: | ---: |
| Swahili | `swa` | Swahili-English Nairobi, Kisii, Wajir, Mombasa, Nakuru; Swahili Tanzania Dar-es-Salaam | 0 | 2,979 | 2,979 |
| Kikuyu | `kik` | Gi-Kabete, Ki-Mathira, Ki-Muranga, Ki-Ndia, Gi-Gichugu | 183 | 571 | 754 |
| Luo / Dholuo | `luo` | Nyandwat, Milambo | 195 | 528 | 723 |
| Somali | `som` | Maxatire, Mogadishu | 118 | 884 | 1,002 |
| Kalenjin | `kln` | Nandi, Kipsigis | 122 | 399 | 521 |
| Maasai | `mas` | Kimasaai, Kisamburu | 51 | 454 | 505 |

## Source Repositories

- Swahili: `DigitalUmuganda/Afrivoice_Swahili`
- Kikuyu, Luo, Somali Maxatire, Maasai, and Kalenjin: `MCAA1-MSU/anv_data_ke`
- Somali Mogadishu: `DigitalUmuganda/Afrivoice` under Somali paths
- Test set: `digitalumuganda/anv-test-data-nt`

## Test Dataset Download

```python
import kagglehub

path = kagglehub.dataset_download("digitalumuganda/anv-test-data-nt")
print("Path to dataset files:", path)
```

The Kaggle test package is documented as CC BY 4.0. Preserve dataset attribution in model cards, reports, and final submission artifacts.

## Local Imported Package

A local Kaggle package has been copied into the repository at:

```text
data/raw/kaggle/anv-test-data-nt/afri-voices-east-africa-asr-hackathon.zip
```

The current package is validated by the dataset integration endpoint before it is used for manifests or final submission. If the package contains a Google reCAPTCHA/challenge HTML file instead of audio, the dashboard will mark it as `blocked_download_html` and require a Kaggle-authenticated `kagglehub` download before final inference.
