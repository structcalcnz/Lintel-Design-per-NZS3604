
# User Manual and Technical Specification
## Timber Lintel Design Spreadsheet
(Version: 1.0a)

Design Standard: NZS 3604

---

### 1. Running Environment

*   **Operating System:** Microsoft Windows 10 or Windows 11
*   **Microsoft Excel Version:** Excel 2016 or newer (including Office 365)
*   **System Requirements:** Macros must be supported and enabled. Administrative rights may be required to unblock the file and set macro permissions.

### 2. Spreadsheet Setup

To ensure full functionality of the spreadsheet:

**Step 1: Unblock the File**
1.  Right-click the downloaded `.xlsm` file
2.  Go to **Properties**
3.  Check the box "Unblock" at the bottom (if it appears)
4.  Click **Apply** and then **OK**

    ![Unblock File Example](/images/unblock%20file.png)

**Step 2: Enable Macros**
1.  Open the Excel file
2.  If prompted, click “Enable Content” to allow macros
3.  Confirm the file is placed in a Trusted Location, or modify the Trust Center settings under:
    `File → Options → Trust Center → Trust Center Settings → Macro Settings`
    
    ![Enable Macros Example](/images/trust%20centre.png)



### 3. Input Lintel Parameters and Search

Start input in the parameters in the left panel. While a input is active, the right panel will show the lintel parameter figures based on the inputs. Read these figures if you are not sure about the input values. The right panel also contains a table of lintels, which displays your previous search result for the project.

![Search Lintel UI](/images/lintel_UI.png)

To add new rows:
*   Use the “serch” button to add a new row at the bottom of the lintle table in the right panel.

To remove an entry:
*   Use the “Delete Row” button to remove the bselected row.

To rename a lintel:
*   Click on the lintel name in the table, edit and press Enter to confirm.

**Timber Lintel Parameters:**

| Parameter           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**            | User-defined lintel name, indentifer for the project.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Lintel Type**     | Defines the loading configuration on the lintel. Refers to figures in NZS 3604. Common types include: <br/> **A - roof only:** Lintel supporting roof loads only. <br/> **B - roof and wall:** Lintel supporting both roof and wall loads. <br/> *(Further specific types as per Figures below.)*                                                                                                                                                                                                                                                                                            |
| **Span (m)**        | The clear span of the lintel in meters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Load Dim (m)**    | The tributary load dimension for the lintel in meters, influencing the total load. Refer to NZS 3604 for definition based on roof and wall types.<br/> *(Further figures showing load dimensions shown below.)*                                                                                                                                                                                                                                                                                                                                                     |
| **Roof**            | Type of roof loading: **Light** or **Heavy**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Wall**            | Type of wall loading: **Light** or **Medium**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Grade**           | Timber grade supported: Only SG8 supported in this version, so it is not shown in the table.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Size**| The looked-up lintel's section.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

| **Note**            | Any additional notes for the specific lintel.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

### 4. Input Project Information

While using the buttons to export or print the lintel table, you will be prompted to input project information. This information is saved with the exported data and included in the PDF report.

Fill in:
*   **Project Name:** input the project title (name or address)
*   **Job Number:** input the job number
*   **Client:** input client name or number as required

These values are saved with exported data and included in the PDF report and populate the calculation report automatically.
### 5. Save & Import Data

**Save Data:**
*   Use the “Export” button to save the current input as a `.csv` file.
*   The file will allow to be downloaded with the browser, select the folder and input file name to save the data file.

**Import Data:**
*   the exported data is allow to reload to our **Lintel Excel Spreadsheet** for edits or reviews.
*   Choose a valid `.CSV` file previously saved (a valid file shall be with a header starting with `<LintelDataCSVfile>`).
*   The spreadsheet UI automatically adjusts to fit the imported dataset.

### 6. Print the Lintel Talbe to PDF

After complete search all lintels for a project, click "Print" button and follow the steps to print the lintel report.

The current version does not allow revise the lintel size and the title block. If you need to modify the size and title block, please export the data to a `.csv` file and edit it in our Excel spreadsheet, which is available for download at [StructCalcNZ Google Site.](https://sites.google.com/view/nzsc-team/tools-articles?authuser=3)

### 7. Timber Lintel Design (per NZS 3604)

Lintel design in this spreadsheet is based on **Section 6.4 "Engineering-Basis-of-NZS-3604" issued by BRANZ**.

The spreadsheet is intended for the design of **solid timber lintels** assuming **uniformly distributed loads**.

**Important Note: Specific Engineering Design (SED) Required for Point Loads**
Lintels supporting concentrated loads (e.g., from girder trusses, or from trimmer studs supporting upper floor beam) fall outside the scope of the standard NZS 3604 and this spreadsheet. **Such lintels must be designed by a structural engineer.**

**7.1 Loads**

The lintel span tables and calculations are derived using the following typical dead and live loads. These values influence the `Roof` and `Wall` type selections in the input.

| Component (light, medium, heavy cladding defined in NZS 3604 Cl. 1.3) | Dead load (G) (kPa) | Live load (Q) (kPa) | Snow load (S) (kPa) |
| :-------------------------------------------------------------------- | :------------------ | :------------------ | :------------------ |
| Roof (including framing and ceiling) - Light                          | 0.35 (0.2 for uplift) | 0.25                | 1.0 (Sec 8)         |
| Roof (including framing and ceiling) - Heavy                          | 0.75 (0.4 for uplift) | -                   | 1.5 and 2.0 (Sec 15)|
| Wall - Light                                                          | 0.4 (0.2 under uplift) | -                  | -                   |
| Wall - Medium                                                         | 0.80 (0.2 under uplift) | -                 | -                   |
| Floor                                                                 | 0.4                 | 2.0 (Sec 8)         | -                   |
|                                                                       |                     | 3.0 (Sec 14)        |                     |

*Assumed typical dimensions for load derivation (as per BRANZ Engineering Basis):*
*   Eaves overhang: 750 mm
*   Wall height: 2.4 m
*   Floor span: 6.0 m

**7.2 Design for Safety (ULS)**

The spreadsheet performs checks based on Ultimate Limit State (ULS) load combinations.
*   **Strength Reduction Factor (ϕ):** 0.8
*   **Load Combinations (as per NZS 3604/BRANZ Basis):**
    1.  1.35 G
    2.  1.2 G + 1.5 Q
    3.  0.9 G - W_u (Wind uplift)
    4.  1.2 G + Q_c + 1.0 S_c (Snow)
*   The load combination factor for ULS (ψ) was taken as 0.0 for roof and 0.4 for floors.
*   **Load Duration Factors (k₁):**
    | Load Case | k₁ (Load Duration Factor) |
    | :-------- | :------------------------ |
    | 1         | 0.6                       |
    | 2         | 0.8                       |
    | 3         | 1.0                       |
    | 4         | 0.8                       |
*   **Assumptions for Member Capacity:**
    *   Restraint to the top of the lintel members is assumed to be provided by wall framing at 600 mm centres.
    *   Full rotational restraint at the ends is assumed to be provided by trimmer studs.
    *   The stability factor `k_s` is taken as 1.0.
    *   Load sharing by other members (e.g., roof and wall framing) is **not** considered (`k_l = 1.0`).
*   **Bearing Area Factor (k_b):** Taken as 1.36 for single supporting studs and 1.1 for doubled studs.
*   **Connection Capacity:** Standard fixings (as per NZS 3604 Table 8.19) are assumed to provide a capacity of 2 kN for lintel to trimmer stud connections. More robust nail strap connections provide 7.5 kN (ULS).

**7.3 Design for Serviceability (SLS)**

Design for serviceability considers bending deflection, including the effects of creep where appropriate.
*   **Load Cases Considered (SLS):**
    1.  G + ψ_s * Q (short-term)
    2.  G + ψ_l * Q (long-term)
    3.  G + ψ_s * Q + W_s (wind short-term)
    4.  G + ψ_s * Q + S_s (snow short-term)
*   **Short-term (ψ_s) and Long-term (ψ_l) Load Factors:**
    | Load       | Short-term factor (ψ_s) | Long-term factor (ψ_l) |
    | :--------- | :---------------------- | :--------------------- |
    | Live (floor)| 0.7                     | 0.4                    |
    | Live (roof)| 0.7                     | 0.0                    |
    | Snow       | 0.5                     | 0.0                    |
*   **Deflection Calculation:** Lintel deflections are calculated using the lower bound modulus of elasticity (`E_0.05`) from NZS 3603 (Table 6). Only dry timber is considered.
*   **Deflection Criteria:**
    *   Span/300 for load cases 1, 2, and 4.
    *   Span/200 for load case 3 (G + ψ_s * Q + W_s).
    *   An overall limit of 12 mm for all load cases.

### 8. Wind Load Consideration and Steep Roof Multipliers

Wind loads on roof are a critical component of lintel design as per NZS 3604 and the BRANZ Engineering Basis document.

**8.1 Wind Load Input in Spreadsheet**
The face wind loads are not explicitly input as separate parameters in the current version of this app. For more complex wind designs (e.g., specific external/internal pressure coefficients for different wind zones), a full structural analysis is recommended.

*The BRANZ Engineering Basis considered an "extra high wind zone" with a design pressure (p) of 1.82 kPa when deriving the tables.*

**8.2 Steep Roof Multipliers (NZS 3604 Table 8.7)**
The lintel tables and calculations in NZS 3604 are typically prepared on the basis of loads calculated for roof pitches up to 45°. However, NZS 3604's scope extends to roof pitches up to 60°.

For roof pitches between 45° and 60°, Clause 8.6.1.3 of NZS 3604 requires the application of **"steep roof multipliers"**. These multipliers adjust the loaded dimension to account for additional loads on lintels caused by:
*   Increased dead load (due to longer rafter lengths with increasing pitch).
*   Increased overturning moment on the truss as a whole (due to wind loads acting on the roof).

**It is crucial that users apply these steep roof multipliers (from NZS 3604 Table 8.7) to their input 'Load Dim (m)' value when designing lintels for roofs with pitches between 45° and 60°. This spreadsheet does NOT automatically apply these multipliers.**

### 9. General Suggestions

We strongly recommend that you save the data regularly to avoid data loss in case of errors or corruption accidentally. To export the data:
*   Use “Export” to save the lintel data to an external file regularly.

In case the app encounters errors:
*   **Step 1:** Refresh the web page (you will lose all exisitng inputs).
*   **Step 2:** If the problem continues, close your browser and reopen.

**Important Notice:**
This tool is for preliminary sizing only. All lintel designs must be reviewed and approved by an authorized structural engineer or timber supplier prior to construction.

**Reporting a Bug / Request for Protected Sheets Password**
If you encounter any issues or bugs with the spreadsheet, please follow these steps:

**To Report a Bug:**
Email us with a detailed description of the issue, including any error messages encountered, steps to reproduce the problem, and your Excel version.
Contact Email: structcalcnz@gmail.com

### Copyright and Disclaimer

© 2025 StructCalcNZ. All rights reserved.

This web app is provided as a design aid for timber lintel design. You are free to use and distribute this app for non-commercial and commercial purposes.

**Modification of the underlying code, macros, or any internal functionality of this app without permit is strictly prohibited.**

This tool is not a substitute for construction purpose without professional engineering judgment. The user assumes full responsibility for all design work and the accuracy of inputs and results. All designs must be reviewed and approved by an authorized structural engineer or timber supplier prior to construction.

For full licensing details, limitations, and warranty disclaimers, please refer to the [LICENSE](/LICENSE.txt) file in this repository.

For any queries regarding usage or distribution, or to report a bug, please contact: structcalcnz@gmail.com