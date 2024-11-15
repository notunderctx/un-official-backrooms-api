import json
import re
from bs4 import BeautifulSoup

def process_html_content(input_json_path, output_json_path, failed_links_path,image_filter):
    with open(input_json_path, "r") as infile:
        data = json.load(infile)
    
    processed_data = []
    failed_links = []

    for entry in data:
        try:
            if "!!THIS PAGE DOES NOT EXIST YET!!" in entry['htmlContent']:
                failed_links.append(entry['href'])
                continue

            soup = BeautifulSoup(entry['htmlContent'], 'html.parser')

            description = None
            images = []

            description_header = soup.find(string=re.compile(r'(?i)Description')) or soup.find(string=re.compile(r'(?i)Phenomenon'))
            if description_header:
                description_tags = description_header.find_all_next('p')
                description = ""
                last_source_tag = None
                for tag in description_tags:
                    description += str(tag) + "<br>"
                    if "Source:" in tag.get_text(strip=True):
                        last_source_tag = tag
                        break
                if last_source_tag:
                    description += str(last_source_tag) + "<br>"

            img_tags = soup.find_all('img')
            level_image = None

            for img in img_tags:
                img_src = img.get('src')
                if img_src:
                    if image_filter in img_src.lower() and not level_image:
                        level_image = img_src  # Assign the first image with 'level' in its source
                    else:
                        images.append(img_src)

            # If we found a 'level' image, place it first
            if level_image:
                images.insert(0, level_image)

            # Add level field from the text property of the entry
            level = entry.get("text", "No level text found")

            if description or images:
                processed_data.append({
                    "href": entry["href"],
                    "title": entry["title"],
                    "description": description if description else "No description found",
                    "images": images if images else ["No images found"],
                    "level": level
                })
            else:
                failed_links.append(entry["href"])

        except Exception as e:
            failed_links.append(entry["href"])

    with open(output_json_path, "w") as outfile:
        json.dump(processed_data, outfile, indent=2)

    with open(failed_links_path, "w") as failed_file:
        for link in failed_links:
            failed_file.write(link + "\n")

if __name__ == "__main__":
    input_json_path = "/Users/robertbwire/trpc-express-comparison/cache/phenomena.json"
    output_json_path = "/Users/robertbwire/trpc-express-comparison/cache/processed_phenomena.json"
    failed_links_path = "failed_links.txt"
    process_html_content(input_json_path, output_json_path, failed_links_path,image_filter="object")
