# Machine source audit

Initial audit date: 7 October 2026
Latest verification: 4 November 2026

## Source priority

1. `MODTECH_Casting_Machines_Master_Final.pdf` for investment-casting machine names, descriptions, technical data, options, and model tables.
2. `Original Modtech - Robotics & Automation - Packaging for script.docx` for robotics and packaging machine copy and supplied photographs.
3. The published Modtech website as a cross-check for established product identity and legacy product-page information.

No technical value was copied from one machine into another. Where the supplied PDF described a product but supplied no embedded product photograph, the catalogue deliberately shows no machine image and labels the image area as unavailable.

## Final catalogue count

| Division              | Machines |
| --------------------- | -------: |
| Investment Casting    |       22 |
| Robotics & Automation |        5 |
| **Total**             |   **27** |

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

The automated catalogue audit checks all 27 machine detail pages, expects 22 casting listing links and 5 robotics listing links, verifies every referenced local image, checks image alternative text, and confirms that a missing machine slug returns HTTP 404.

## Final cross-check result

- Re-read the PDF product sections and the five primary DOCX system sections against the corresponding catalogue records.
- Retained only Vertical Sander and Slurry Preparation Tank from the document-only additions and connected both to their existing genuine product photographs.
- Standardised the public casting copy to use `Vertical Sander` and `Slurry Preparation Tank`; retired Rain Sander and Slurry Tank URLs redirect to the retained pages.
- Confirmed all 27 catalogue records have unique slugs and machine codes, complete titles, descriptions, highlights, applications, primary images and specifications. All structured specification tables have matching columns and values.
- Corrected detail-page range labels so separate products are described as machines or systems, not as models; only true wax-extruder variants use the variant label.
- Removed `palletizing-line.png` from the Robotic Palletizing gallery because the photograph shows a case-packing line; the two verified palletizing installation photographs remain.
- Confirmed that catalogue source files are clean UTF-8 and that degree, range, multiplication and separator symbols render from the correct characters.
- Final automated result is recorded after each catalogue verification run; the audit accepts a machine without an image only when the page otherwise remains complete and contains no broken image reference.
