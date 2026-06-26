import kagglehub


def main() -> None:
    path = kagglehub.dataset_download("digitalumuganda/anv-test-data-nt")
    print("Path to dataset files:", path)


if __name__ == "__main__":
    main()

