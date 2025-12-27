"""
Pytest configuration file.

This file is automatically loaded by pytest before running any tests.
It sets up the Python path so that imports from the 'source' directory work correctly.
"""
import sys
from pathlib import Path

# Add project root to Python path
# This allows imports like: from source.db.xxx import ...
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

