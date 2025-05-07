namespace SpriteKind {
    export const Coin = SpriteKind.create()
    export const Flower = SpriteKind.create()
}
let list = 0
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    frogger.vy = -200
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`lava`, function (sprite, location) {
    game.gameOver(false)
    game.setGameOverEffect(false, effects.splatter)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`win portal`, function (sprite, location) {
    game.gameOver(true)
    game.setGameOverEffect(true, effects.confetti)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`next level portal`, function (sprite, location) {
    current_level += 1
    startlevel()
})
function startlevel () {
    frogger = sprites.create(assets.image`Frogger`, SpriteKind.Player)
    controller.moveSprite(frogger, 100, 0)
    if (current_level == 0) {
        tiles.setCurrentTilemap(tilemap`level 1 tilemap`)
        scene.setBackgroundImage(assets.image`level 1 background`)
    } else if (false) {
        tiles.setCurrentTilemap(tilemap`level 2 tilemap`)
        scene.setBackgroundImage(assets.image`level 2 background`)
    } else {
        tiles.setCurrentTilemap(tilemap`level 3 tilemap`)
        scene.setBackgroundColor(9)
    }
    tiles.placeOnRandomTile(frogger, assets.tile`hero placeholder`)
    for (let value of tiles.getTilesByType(assets.tile`hero placeholder`)) {
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    frogger.ay = 400
    scene.cameraFollowSprite(frogger)
    info.setLife(3)
    for (let value of sprites.allOfKind(list)) {
        sprites.destroy(value)
    }
    for (let value of tiles.getTilesByType(assets.tile`coin placeholder`)) {
        coin = sprites.create(assets.image`caterpillar coin`, SpriteKind.Coin)
        animation.runImageAnimation(
        coin,
        assets.animation`caterpillar animation`,
        300,
        true
        )
        tiles.placeOnTile(coin, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`orange flower placeholder`)) {
        flower = sprites.create(assets.image`flower orange`, SpriteKind.Flower)
        tiles.placeOnTile(flower, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flower, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    bee = sprites.create(assets.image`bee word not animated`, SpriteKind.Enemy)
    animation.runImageAnimation(
    bee,
    assets.animation`bee animation`,
    150,
    true
    )
    bee.follow(frogger)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    if (frogger.y < otherSprite.y) {
        info.changeScoreBy(3)
    } else {
        info.changeLifeBy(-1)
    }
})
let bee: Sprite = null
let flower: Sprite = null
let coin: Sprite = null
let frogger: Sprite = null
let current_level = 0
scene.setBackgroundColor(9)
current_level = 0
startlevel()
game.onUpdate(function () {
    frogger.setImage(assets.image`Frogger`)
    if (frogger.vy < 0) {
        frogger.setImage(assets.image`frogger right up`)
    } else if (frogger.vy > 0) {
        frogger.setImage(assets.image`frogger right down`)
    } else if (frogger.x % 2 == 0) {
        frogger.setImage(assets.image`Frogger`)
    }
    if (frogger.vx < 0) {
        frogger.image.flipX()
    }
})
