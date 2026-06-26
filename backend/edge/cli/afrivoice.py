import argparse
import json
from pathlib import Path

from app.core.inference import transcribe_audio


def main() -> None:
    parser = argparse.ArgumentParser(description="Offline AfriVoice ASR CLI")
    parser.add_argument("audio", type=Path)
    parser.add_argument("--language", default=None)
    parser.add_argument("--offline", action="store_true")
    parser.add_argument("--adapter", default=None)
    parser.add_argument("--model-name", default=None)
    args = parser.parse_args()
    result = transcribe_audio(
        args.audio.name,
        str(args.audio),
        language=args.language,
        detect=args.language is None,
        diarize=False,
        domain="edge_cli",
        adapter_id=args.adapter,
        model_name=args.model_name,
    )
    print(json.dumps({
        "audio": str(args.audio),
        "language": result["language"],
        "offline": args.offline,
        "adapter": result.get("adapter"),
        "confidence": result["confidence"],
        "text": result["normalized_text"],
    }, indent=2))


if __name__ == "__main__":
    main()
