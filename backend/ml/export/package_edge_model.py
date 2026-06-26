from pathlib import Path


def main() -> None:
    target = Path("models/edge")
    target.mkdir(parents=True, exist_ok=True)
    print(f"Edge model package directory ready: {target}")


if __name__ == "__main__":
    main()

