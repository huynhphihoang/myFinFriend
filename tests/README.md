# Running Tests with pytest

This guide explains how to run tests for the myFinFriend project using pytest.

## Prerequisites

### 1. Install pytest

First, make sure pytest is installed. You can add it to your `requirements.txt` or install it directly:

```bash
pip install pytest
```

Or add it to `requirements.txt`:
```
pytest>=7.0.0
```

Then install all dependencies:
```bash
pip install -r requirements.txt
```

### 2. Environment Setup

Ensure you have a `.env` file in the project root with the necessary environment variables:
- `GEMINI_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Running Tests

### Run all tests

From the project root directory (`myFinFriend/`), run:

```bash
pytest
```

### Run tests in a specific file

```bash
pytest tests/test_category_extractor.py
pytest tests/test_gemini_client.py
```

### Run tests with verbose output

See detailed information about each test:

```bash
pytest -v
```

### Run tests with output capture disabled

See print statements and other output from your tests:

```bash
pytest -s
```

### Run tests and show print statements with verbose output

Combine both flags:

```bash
pytest -v -s
```

### Run a specific test function

If your test file has a function named `test_example()`, you can run just that test:

```bash
pytest tests/test_category_extractor.py::test_example
```

## Writing Tests

### Test File Naming

Test files should start with `test_` or end with `_test.py`:
- ✅ `test_category_extractor.py`
- ✅ `category_extractor_test.py`
- ❌ `category_extractor.py` (won't be discovered)

### Test Function Naming

Test functions should start with `test_`:

```python
def test_get_categories():
    # Your test code here
    assert True

def test_extract_transactions():
    # Your test code here
    assert True
```

### Example Test Structure

```python
from source.db.category_extractor import get_transaction_categories_with_ids
from source.db.supabase_client import get_supabase

def test_get_transaction_categories():
    """Test that categories can be retrieved from Supabase."""
    supabase_client = get_supabase()
    categories = get_transaction_categories_with_ids(supabase_client)
    
    assert categories is not None
    assert isinstance(categories, list)
    # Add more assertions as needed
```

## How Path Configuration Works

The `conftest.py` file in the `tests/` directory automatically sets up the Python path before running any tests. This means:

- ✅ You can use imports like: `from source.db.xxx import ...`
- ✅ You don't need to add path setup code to each test file
- ✅ All test files automatically inherit this configuration

## Common pytest Options

| Option | Description |
|--------|-------------|
| `-v, --verbose` | Verbose output (shows each test) |
| `-s` | Disable output capture (show print statements) |
| `-k EXPRESSION` | Run tests matching the expression (e.g., `-k "category"`) |
| `-x` | Stop after first failure |
| `--tb=short` | Shorter traceback format |
| `--tb=no` | No traceback |
| `--collect-only` | Show what tests would be run without running them |

## Troubleshooting

### Import errors

If you see import errors, make sure:
1. You're running pytest from the project root directory
2. The `conftest.py` file exists in the `tests/` directory
3. Your imports use the `source.` prefix (e.g., `from source.db.xxx import ...`)

### Module not found

If pytest can't find your modules:
1. Check that `pyproject.toml` has `pythonpath = ["."]` configured
2. Verify you're in the correct directory (project root, not `tests/` or `source/`)
3. Ensure all dependencies are installed: `pip install -r requirements.txt`

### Environment variable errors

If tests fail due to missing environment variables:
1. Create a `.env` file in the project root
2. Add all required environment variables (see Prerequisites section)
3. Make sure `python-dotenv` is installed (it should load `.env` automatically)

## Additional Resources

- [pytest documentation](https://docs.pytest.org/)
- [pytest best practices](https://docs.pytest.org/en/stable/explanation/goodpractices.html)

