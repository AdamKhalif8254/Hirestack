import os
import shutil
import zipfile

def package_lambda():
    # Create a temporary directory for packaging
    if os.path.exists('package'):
        shutil.rmtree('package')
    os.makedirs('package')

    # Copy your Lambda function code
    shutil.copy('main.py', 'package')
    shutil.copytree('utils', 'package/utils')

    # Copy dependencies
    site_packages = 'venv/lib/python3.12/site-packages'  # Adjust Python version if needed
    for item in os.listdir(site_packages):
        s = os.path.join(site_packages, item)
        d = os.path.join('package', item)
        if os.path.isdir(s):
            shutil.copytree(s, d)
        else:
            shutil.copy2(s, d)

    # Create a zip file
    shutil.make_archive('lambda_function', 'zip', 'package')

    # Clean up
    shutil.rmtree('package')

    print("Lambda function packaged as lambda_function.zip")

if __name__ == "__main__":
    package_lambda()