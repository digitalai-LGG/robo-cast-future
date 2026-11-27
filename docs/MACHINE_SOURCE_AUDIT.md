# Machine source audit

Initial audit date: 7 October 2026
Latest verification: 27 November 2026

## November 2026 model-document reconciliation

The supplied individual Wax, Soluble Wax and Ceramic machine DOCX files are now the primary source for public model tables. The earlier summary workbook remains a reconciliation aid because it contains missing models, stale values and dimension-entry errors.

- Added the standard-wax WI models to the 4-pillar and C-frame family tables; the existing SOL models are labelled as soluble-wax specifications.
- Added model-by-model IGT tables for three 4-pillar and two C-frame machines.
- Replaced unsupported IGT summary claims of 32 L shot capacity, 200 L tank capacity and 1,000 cc/s flow with the supplied model-document values: up to 18.5 L, 120 L and 500 cc/s.
- Updated Automode and Ceramic injection pressure to 5–70 bar and HMI size to 15.6 inches.
- Updated the 4-pillar 30T Ceramic overall width to 3,200 mm and the C-frame 50T Ceramic weight to 9,000 kg.
- The 30T Ceramic documents state a 35 L main tank but label the optional second tank as 30 L. The public table shows the main technical-specification value and discloses the source conflict.
- Updated current Shell Room pages where the new documents provide different values: Fluidized Bed diameter, separate Wash/Rinse and Pre-Wet depth ranges, and High Shear Mixer details.

Source-document corrections still required outside the website repository:

- The IGT 200T and 300T 4-pillar documents and the IGT 50T C-frame document contain a second-wax-tank description copied from the platen-heating option.
- The summary workbook omits `WI-Mod-75T-4P` and `WI-Mod-75T-CF`, contains `3,2000` / `3,9000` dimension entries and differs from the model documents on several pressures, HMI sizes, weights and capacities.
- The summary workbook lists 1,000 cc/s for `IGT-Mod-300T-4P`; the supplied individual model document lists 500 cc/s. The public site follows the individual model document pending an approved project datasheet.

## Source priority

1. The supplied individual Wax, Soluble Wax and Ceramic machine DOCX files for model-by-model public specifications.
2. The supplied Shell Room DOCX files and `MODTECH_Casting_Machines_Master_Final.pdf` for investment-casting machine names, descriptions, configurations and options.
3. `Original Modtech - Robotics & Automation - Packaging for script.docx` for robotics and packaging machine copy and supplied photographs.
4. The published Modtech website as a cross-check for established product identity and legacy product-page information.

No technical value was copied from one machine into another. Where the supplied PDF described a product but supplied no embedded product photograph, the catalogue deliberately shows no machine image and labels the image area as unavailable.

## Final catalogue count

| Division              | Machines |
| --------------------- | -------: |
| Investment Casting    |       23 |
| Robotics & Automation |        5 |
| **Total**             |   **28** |

## Source-document products retained

Two source-document products are retained as requested. Their existing genuine machine photographs from the product records are now used on both the catalogue cards and detail pages.

| Source product          | Catalogue slug            | Photograph record                                       |
| ----------------------- | ------------------------- | ------------------------------------------------------- |
| Vertical Sander         | `vertical-sander`         | Existing Rainfall Sander front and interior photographs |
| Slurry Preparation Tank | `slurry-preparation-tank` | Existing Slurry Mixer front and side photographs        |

The five other document-only entries—Shell Drying Conveyor, Stucco Elevator, Shell Hangers, IC-Series Shell-Handling Robot and Robot Gripper—are not published in the catalogue.

## Source reconciliation notes

- The PDF's nine wax-injection model documents are variants and specification sheets belonging to the existing 4-Pillar and C-Frame product families. They remain model rows on those family pages rather than being counted as nine unrelated machines.
- The repeated 50-ton wax-injection source sheet is a duplicate source entry, not an additional machine.
- The previous `rain-sander` record is consolidated into `vertical-sander`; the old URL redirects to the retained product page.
- The previous `slurry-tank` record is consolidated into `slurry-preparation-tank`; the old URL redirects to the retained product page.
- `Wash/Rinse Tank` and the other website-writeup products remain mapped to their existing catalogue machines without duplicates.
- The DOCX's five primary systems map one-to-one to Robotic Case Erector, Robotic Case Packer, Robotic Palletizing System, Pick & Place Automation, and Vision Inspection System. Their existing document-supplied photographs are reused in the galleries.

## Verification target

The automated catalogue audit checks all 28 machine detail pages, expects 23 casting listing links and 5 robotics listing links, verifies every referenced local image, checks image alternative text, and confirms that a missing machine slug returns HTTP 404.

## Final cross-check result

- Re-read the PDF product sections and the five primary DOCX system sections against the corresponding catalogue records.
- Retained only Vertical Sander and Slurry Preparation Tank from the document-only additions and connected both to their existing genuine product photographs.
- Standardised the public casting copy to use `Vertical Sander` and `Slurry Preparation Tank`; retired Rain Sander and Slurry Tank URLs redirect to the retained pages.
- Confirmed all 28 catalogue records have unique slugs and machine codes, complete titles, descriptions, highlights, applications, primary images and specifications. All structured specification tables have matching columns and values.
- Corrected detail-page range labels so separate products are described as machines or systems, not as models; only true wax-extruder variants use the variant label.
- Removed `palletizing-line.png` from the Robotic Palletizing gallery because the photograph shows a case-packing line; the two verified palletizing installation photographs remain.
- Confirmed that catalogue source files are clean UTF-8 and that degree, range, multiplication and separator symbols render from the correct characters.
- Final automated result is recorded after each catalogue verification run; the audit accepts a machine without an image only when the page otherwise remains complete and contains no broken image reference.
