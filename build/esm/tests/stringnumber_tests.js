import { VexFlowTests } from './vexflow_test_helpers.js';
import { Glyph } from '../src/glyph.js';
import { Renderer } from '../src/renderer.js';
import { Stave } from '../src/stave.js';
import { BarlineType } from '../src/stavebarline.js';
import { Stroke } from '../src/strokes.js';
const StringNumberTests = {
    Start() {
        QUnit.module('StringNumber');
        const run = VexFlowTests.runTests;
        run('String Number In Notation', drawMultipleMeasures);
        run('Fret Hand Finger In Notation', drawFretHandFingers);
        run('Multi Voice With Strokes, String & Finger Numbers', multi);
        run('Complex Measure With String & Finger Numbers', drawAccidentals);
    },
};
function drawMultipleMeasures(options) {
    const f = VexFlowTests.makeFactory(options, 775, 200);
    const score = f.EasyScore();
    const stave1 = f.Stave({ width: 300 }).setEndBarType(BarlineType.DOUBLE).addClef('treble');
    const notes1 = score.notes('(c4 e4 g4)/4., (c5 e5 g5)/8, (c4 f4 g4)/4, (c4 f4 g4)/4', { stem: 'down' });
    notes1[0]
        .addModifier(0, f.StringNumber({ number: '5', position: 'right' }))
        .addModifier(1, f.StringNumber({ number: '4', position: 'left' }))
        .addModifier(2, f.StringNumber({ number: '3', position: 'right' }));
    notes1[1]
        .addModifier(0, f.Accidental({ type: '#' }))
        .addModifier(0, f.StringNumber({ number: '5', position: 'below' }))
        .addModifier(1, f.Accidental({ type: '#' }).setAsCautionary())
        .addModifier(2, f
        .StringNumber({ number: '3', position: 'above' })
        .setLastNote(notes1[3])
        .setLineEndType(Renderer.LineEndType.DOWN));
    notes1[2]
        .addModifier(0, f.StringNumber({ number: '5', position: 'left' }))
        .addModifier(2, f.StringNumber({ number: '3', position: 'left' }))
        .addModifier(1, f.Accidental({ type: '#' }));
    notes1[3]
        .addModifier(0, f.StringNumber({ number: '5', position: 'right' }).setOffsetY(7))
        .addModifier(1, f.StringNumber({ number: '4', position: 'right' }).setOffsetY(6))
        .addModifier(2, f.StringNumber({ number: '3', position: 'right' }).setOffsetY(-6));
    const voice1 = score.voice(notes1);
    f.Formatter().joinVoices([voice1]).formatToStave([voice1], stave1);
    const stave2 = f
        .Stave({ x: stave1.getWidth() + stave1.getX(), y: stave1.getY(), width: 300 })
        .setEndBarType(BarlineType.DOUBLE);
    const notes2 = score.notes('(c4 e4 g4)/4, (c5 e5 g5), (c4 f4 g4), (c4 f4 g4)', { stem: 'up' });
    notes2[0]
        .addModifier(0, f.StringNumber({ number: '5', position: 'right' }))
        .addModifier(1, f.StringNumber({ number: '4', position: 'left' }))
        .addModifier(2, f.StringNumber({ number: '3', position: 'right' }));
    notes2[1]
        .addModifier(0, f.Accidental({ type: '#' }))
        .addModifier(0, f.StringNumber({ number: '5', position: 'below' }))
        .addModifier(1, f.Accidental({ type: '#' }))
        .addModifier(2, f.StringNumber({ number: '3', position: 'above' }).setLastNote(notes2[3]).setDashed(false));
    notes2[2]
        .addModifier(2, f.StringNumber({ number: '3', position: 'left' }))
        .addModifier(1, f.Accidental({ type: '#' }));
    notes2[3]
        .addModifier(0, f.StringNumber({ number: '5', position: 'right' }).setOffsetY(7))
        .addModifier(1, f.StringNumber({ number: '4', position: 'right' }).setOffsetY(6))
        .addModifier(2, f.StringNumber({ number: '3', position: 'right' }).setOffsetY(-6));
    const voice2 = score.voice(notes2);
    f.Formatter().joinVoices([voice2]).formatToStave([voice2], stave2);
    const stave3 = f
        .Stave({ x: stave2.getWidth() + stave2.getX(), y: stave2.getY(), width: 150 })
        .setEndBarType(BarlineType.END);
    const notesBar3 = score.notes('(c4 e4 g4 a4)/1.');
    notesBar3[0]
        .addModifier(0, f.StringNumber({ number: '5', position: 'below' }))
        .addModifier(1, f.StringNumber({ number: '4', position: 'right' }))
        .addModifier(2, f.StringNumber({ number: '3', position: 'left' }))
        .addModifier(3, f.StringNumber({ number: '2', position: 'above' }));
    const voice3 = score.voice(notesBar3, { time: '6/4' });
    f.Formatter().joinVoices([voice3]).formatToStave([voice3], stave3);
    f.draw();
    ok(true, 'String Number');
}
function drawFretHandFingers(options) {
    const f = VexFlowTests.makeFactory(options, 725, 200);
    const score = f.EasyScore();
    const stave1 = f.Stave({ width: 350 }).setEndBarType(BarlineType.DOUBLE).addClef('treble');
    const notes1 = score.notes('(c4 e4 g4)/4, (c5 e5 g5), (c4 f4 g4), (c4 f4 g4)', { stem: 'down' });
    notes1[0]
        .addModifier(0, f.Fingering({ number: '3', position: 'left' }))
        .addModifier(1, f.Fingering({ number: '2', position: 'left' }))
        .addModifier(2, f.Fingering({ number: '0', position: 'left' }));
    notes1[1]
        .addModifier(0, f.Accidental({ type: '#' }))
        .addModifier(0, f.Fingering({ number: '3', position: 'left' }))
        .addModifier(1, f.Fingering({ number: '2', position: 'left' }))
        .addModifier(1, f.Accidental({ type: '#' }))
        .addModifier(2, f.Fingering({ number: '0', position: 'left' }));
    notes1[2]
        .addModifier(0, f.Fingering({ number: '3', position: 'below' }))
        .addModifier(1, f.Fingering({ number: '4', position: 'left' }))
        .addModifier(1, f.StringNumber({ number: '4', position: 'left' }))
        .addModifier(2, f.Fingering({ number: '0', position: 'above' }))
        .addModifier(1, f.Accidental({ type: '#' }));
    notes1[3]
        .addModifier(0, f.Fingering({ number: '3', position: 'right' }))
        .addModifier(0, f.StringNumber({ number: '5', position: 'right' }).setOffsetY(7))
        .addModifier(1, f.Fingering({ number: '4', position: 'right' }))
        .addModifier(1, f.StringNumber({ number: '4', position: 'right' }).setOffsetY(6))
        .addModifier(2, f.Fingering({ number: '0', position: 'right' }).setOffsetY(-5))
        .addModifier(2, f.StringNumber({ number: '3', position: 'right' }).setOffsetY(-6));
    const voice1 = score.voice(notes1);
    f.Formatter().joinVoices([voice1]).formatToStave([voice1], stave1);
    const stave2 = f
        .Stave({ x: stave1.getWidth() + stave1.getX(), y: stave1.getY(), width: 350 })
        .setEndBarType(BarlineType.END);
    const notes2 = score.notes('(c4 e4 g4)/4., (c5 e5 g5)/8, (c4 f4 g4)/8, (c4 f4 g4)/4.[stem="down"]', {
        stem: 'up',
    });
    notes2[0]
        .addModifier(0, f.Fingering({ number: '3', position: 'right' }))
        .addModifier(1, f.Fingering({ number: '2', position: 'left' }))
        .addModifier(1, f.StringNumber({ number: '4', position: 'right' }))
        .addModifier(2, f.Fingering({ number: '0', position: 'above' }));
    notes2[1]
        .addModifier(0, f.Accidental({ type: '#' }))
        .addModifier(0, f.Fingering({ number: '3', position: 'right' }))
        .addModifier(1, f.Fingering({ number: '2', position: 'left' }))
        .addModifier(1, f.Accidental({ type: '#' }))
        .addModifier(2, f.Fingering({ number: '0', position: 'left' }));
    notes2[2]
        .addModifier(0, f.Fingering({ number: '3', position: 'below' }))
        .addModifier(1, f.Fingering({ number: '2', position: 'left' }))
        .addModifier(1, f.StringNumber({ number: '4', position: 'left' }))
        .addModifier(2, f.Fingering({ number: '1', position: 'right' }))
        .addModifier(2, f.Accidental({ type: '#' }));
    notes2[3]
        .addModifier(0, f.Fingering({ number: '3', position: 'right' }))
        .addModifier(0, f.StringNumber({ number: '5', position: 'right' }).setOffsetY(7))
        .addModifier(1, f.Fingering({ number: '4', position: 'right' }))
        .addModifier(1, f.StringNumber({ number: '4', position: 'right' }).setOffsetY(6))
        .addModifier(2, f.Fingering({ number: '1', position: 'right' }).setOffsetY(-6))
        .addModifier(2, f.StringNumber({ number: '3', position: 'right' }).setOffsetY(-6));
    const voice2 = score.voice(notes2);
    f.Formatter().joinVoices([voice2]).formatToStave([voice2], stave2);
    f.draw();
    ok(true, 'String Number');
}
function multi(options) {
    const f = VexFlowTests.makeFactory(options, 700, 200);
    const score = f.EasyScore();
    const stave = f.Stave();
    const notes1 = score.notes('(c4 e4 g4)/4, (a3 e4 g4), (c4 d4 a4), (c4 d4 a4)', { stem: 'up' });
    notes1[0]
        .addStroke(0, new Stroke(5))
        .addModifier(0, f.Fingering({ number: '3', position: 'left' }))
        .addModifier(1, f.Fingering({ number: '2', position: 'left' }))
        .addModifier(2, f.Fingering({ number: '0', position: 'left' }))
        .addModifier(1, f.StringNumber({ number: '4', position: 'left' }))
        .addModifier(2, f.StringNumber({ number: '3', position: 'above' }));
    notes1[1]
        .addStroke(0, new Stroke(6))
        .addModifier(1, f.StringNumber({ number: '4', position: 'right' }))
        .addModifier(2, f.StringNumber({ number: '3', position: 'above' }))
        .addModifier(0, f.Accidental({ type: '#' }))
        .addModifier(1, f.Accidental({ type: '#' }))
        .addModifier(2, f.Accidental({ type: '#' }));
    notes1[2]
        .addStroke(0, new Stroke(2))
        .addModifier(0, f.Fingering({ number: '3', position: 'left' }))
        .addModifier(1, f.Fingering({ number: '0', position: 'right' }))
        .addModifier(1, f.StringNumber({ number: '4', position: 'right' }))
        .addModifier(2, f.Fingering({ number: '1', position: 'left' }))
        .addModifier(2, f.StringNumber({ number: '3', position: 'right' }));
    notes1[3]
        .addStroke(0, new Stroke(1))
        .addModifier(2, f.StringNumber({ number: '3', position: 'left' }))
        .addModifier(1, f.StringNumber({ number: '4', position: 'right' }));
    const notes2 = score.notes('e3/8, e3, e3, e3, e3, e3, e3, e3', { stem: 'down' });
    notes2[0]
        .addModifier(0, f.Fingering({ number: '0', position: 'left' }))
        .addModifier(0, f.StringNumber({ number: '6', position: 'below' }));
    notes2[2].addModifier(0, f.Accidental({ type: '#' }));
    notes2[4].addModifier(0, f.Fingering({ number: '0', position: 'left' }));
    notes2[4].addModifier(0, f.StringNumber({ number: '6', position: 'left' }).setOffsetX(15).setOffsetY(18));
    const voices = [score.voice(notes2), score.voice(notes1)];
    f.Formatter().joinVoices(voices).formatToStave(voices, stave);
    f.Beam({ notes: notes2.slice(0, 4) });
    f.Beam({ notes: notes2.slice(4, 8) });
    f.draw();
    ok(true, 'Strokes Test Multi Voice');
}
function drawAccidentals(options) {
    const f = VexFlowTests.makeFactory(options, 750);
    const glyphScale = 39;
    const clefWidth = Glyph.getWidth('gClef', glyphScale);
    const notes = [
        f.StaveNote({ keys: ['c/4', 'e/4', 'g/4', 'c/5', 'e/5', 'g/5'], stem_direction: 1, duration: '4' }),
        f.StaveNote({ keys: ['c/4', 'e/4', 'g/4', 'd/5', 'e/5', 'g/5'], stem_direction: 1, duration: '4' }),
        f.StaveNote({ keys: ['c/4', 'e/4', 'g/4', 'd/5', 'e/5', 'g/5'], stem_direction: -1, duration: '4' }),
        f.StaveNote({ keys: ['c/4', 'e/4', 'g/4', 'd/5', 'e/5', 'g/5'], stem_direction: -1, duration: '4' }),
    ];
    notes[0]
        .addModifier(0, f.Fingering({ number: '3', position: 'left' }))
        .addModifier(0, f.Accidental({ type: '#' }))
        .addModifier(1, f.Fingering({ number: '2', position: 'left' }))
        .addModifier(1, f.StringNumber({ number: '2', position: 'left' }))
        .addModifier(1, f.Accidental({ type: '#' }))
        .addModifier(2, f.Fingering({ number: '0', position: 'left' }))
        .addModifier(2, f.Accidental({ type: '#' }))
        .addModifier(3, f.Fingering({ number: '3', position: 'left' }))
        .addModifier(3, f.Accidental({ type: '#' }))
        .addModifier(4, f.Fingering({ number: '2', position: 'right' }))
        .addModifier(4, f.StringNumber({ number: '3', position: 'right' }))
        .addModifier(4, f.Accidental({ type: '#' }))
        .addModifier(5, f.Fingering({ number: '0', position: 'left' }))
        .addModifier(5, f.Accidental({ type: '#' }));
    notes[1]
        .addModifier(0, f.Accidental({ type: '#' }))
        .addModifier(1, f.Accidental({ type: '#' }))
        .addModifier(2, f.Accidental({ type: '#' }))
        .addModifier(3, f.Accidental({ type: '#' }))
        .addModifier(4, f.Accidental({ type: '#' }))
        .addModifier(5, f.Accidental({ type: '#' }));
    notes[2]
        .addModifier(0, f.Fingering({ number: '3', position: 'left' }))
        .addModifier(0, f.Accidental({ type: '#' }))
        .addModifier(1, f.Fingering({ number: '2', position: 'left' }))
        .addModifier(1, f.StringNumber({ number: '2', position: 'left' }))
        .addModifier(1, f.Accidental({ type: '#' }))
        .addModifier(2, f.Fingering({ number: '0', position: 'left' }))
        .addModifier(2, f.Accidental({ type: '#' }))
        .addModifier(3, f.Fingering({ number: '3', position: 'left' }))
        .addModifier(3, f.Accidental({ type: '#' }))
        .addModifier(4, f.Fingering({ number: '2', position: 'right' }))
        .addModifier(4, f.StringNumber({ number: '3', position: 'right' }))
        .addModifier(4, f.Accidental({ type: '#' }))
        .addModifier(5, f.Fingering({ number: '0', position: 'left' }))
        .addModifier(5, f.Accidental({ type: '#' }));
    notes[3]
        .addModifier(0, f.Accidental({ type: '#' }))
        .addModifier(1, f.Accidental({ type: '#' }))
        .addModifier(2, f.Accidental({ type: '#' }))
        .addModifier(3, f.Accidental({ type: '#' }))
        .addModifier(4, f.Accidental({ type: '#' }))
        .addModifier(5, f.Accidental({ type: '#' }));
    const voice = f.Voice().addTickables(notes);
    const ctx = f.getContext();
    const formatter = f.Formatter().joinVoices([voice]);
    const stavePadding = clefWidth + Stave.defaultPadding + 10;
    const nwidth = Math.max(formatter.preCalculateMinTotalWidth([voice]), 490 - stavePadding);
    formatter.format([voice], nwidth);
    const stave = f
        .Stave({ x: 0, y: 0, width: nwidth + stavePadding })
        .setContext(ctx)
        .setEndBarType(BarlineType.DOUBLE)
        .addClef('treble')
        .draw();
    voice.draw(ctx, stave);
    ok(true, 'String Number');
}
VexFlowTests.register(StringNumberTests);
export { StringNumberTests };
