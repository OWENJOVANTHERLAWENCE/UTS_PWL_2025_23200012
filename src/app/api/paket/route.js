import prisma from '@/lib/prisma';

export async function GET() {
    const data = await prisma.paket.findMany({
        orderBy: { id: 'asc' },
    });

    const seeData = data.map((item) => ({
        id: item.id,
        kode: item.kode,
        nama: item.nama,
        deskripsi: item.deskripsi,
    }));

    return new Response(JSON.stringify(seeData), { status: 200 });
}

export async function POST(request) {
    const { kode, nama, deskripsi  } = await request.json();
    
    if (!kode || !nama || !deskripsi ) {
        return new Response(JSON.stringify({ error: 'Semua field wajib diisi' }), {
         status: 400,
        });
    }

    const paket = await prisma.paket.create({
        data: { kode, nama, deskripsi },
    });
    

    return new Response(JSON.stringify(paket), { status: 201 });
}

export async function PUT(request) {
    const { id, kode, nama, deskripsi } = await request.json();
    if (!id || !kode || !nama || !deskripsi) return Response.json({ error: 'Field kosong' }, {
    status: 400 });
    const paket = await prisma.paket.update({
    where: { id },
    data: { kode, nama, deskripsi },
    });
    return Response.json(paket);
    }

export async function DELETE(request) {
    const { id } = await request.json();
    if (!id) return Response.json({ error: 'ID tidak ditemukan' }, { status: 400 });
    await prisma.paket.delete({ where: { id } });
    return Response.json({ message: 'Berhasil dihapus' });
    }
